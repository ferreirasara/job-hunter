import { uniq } from "lodash";
import { getBenefitsBasedOnDescription, getRatingsBasedOnSkillsAndBenefits, getProgramathorNormalizedSkill, getSkillsBasedOnDescription, getTypeBasedOnDescription, getHiringRegimeBasedOnDescription } from "./analyzer/analyzer";
import JobOpportunityController from "./controllers/JobOpportunity.controller";
import { AppDataSource } from "./data-source";
import { convertStrToArray } from "./utils/utils";

AppDataSource.initialize().then(async () => {
  const functionToCall = process?.argv?.[2];

  if (functionToCall === 'update-skills') {
    console.log(`[update-skills] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      if (i % 50 === 0) console.log(`[update-skills] Updating job ${i + 1} of ${allJobsLength}`);
      const oldSkills = [];
      const newSkills = getSkillsBasedOnDescription({ skills: oldSkills, description: job?.description });

      await JobOpportunityController.updateSkills(job.uuid, newSkills?.skills?.join(','));
      await JobOpportunityController.updateDescription(job.uuid, newSkills?.description);
    }
    console.log(`[update-skills] End`);
  } else if (functionToCall === 'update-benefits') {
    console.log(`[update-benefits] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      if (i % 50 === 0) console.log(`[update-benefits] Updating job ${i + 1} of ${allJobsLength}`);
      const oldBenefits = [];
      const newBenefits = getBenefitsBasedOnDescription({ benefits: oldBenefits, description: job?.description });
      await JobOpportunityController.updateBenefits(job.uuid, newBenefits?.benefits?.join(','));
      await JobOpportunityController.updateDescription(job.uuid, newBenefits?.description);
    }
    console.log(`[update-benefits] End`);
  } else if (functionToCall === 'update-ratings') {
    console.log(`[update-ratings] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      if (i % 50 === 0) console.log(`[update-ratings] Updating job ${i + 1} of ${allJobsLength}`);
      const skills = convertStrToArray(job?.skills);
      const benefits = convertStrToArray(job?.benefits);
      const newRating = getRatingsBasedOnSkillsAndBenefits({ benefits, skills });
      await JobOpportunityController.updateRatings(job.uuid, newRating);
    }
    console.log(`[update-ratings] End`);
  } else if (functionToCall === 'normalize-programathor-skills') {
    console.log(`[normalize-programathor-skills] Start`);
    const allJobs = await JobOpportunityController.getAllJobsFromPlatform("PROGRAMATHOR");
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      if (i % 50 === 0) console.log(`[normalize-programathor-skills] Updating job ${i + 1} of ${allJobsLength}`);
      const skills = convertStrToArray(job?.skills);
      const newSkills = skills?.map(cur => getProgramathorNormalizedSkill(cur));
      await JobOpportunityController.updateSkills(job.uuid, newSkills?.join(','));
    }
    console.log(`[normalize-programathor-skills] End`);
  } else if (functionToCall === 'update-type') {
    console.log(`[update-type] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      if (i % 50 === 0) console.log(`[update-type] Updating job ${i + 1} of ${allJobsLength}`);
      const type = getTypeBasedOnDescription({ description: job?.description });

      await JobOpportunityController.updateType(job.uuid, type);
    }
    console.log(`[update-type] End`);
  } else if (functionToCall === 'update-hiring-regime') {
    console.log(`[update-hiring-regime] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      if (i % 50 === 0) console.log(`[update-hiring-regime] Updating job ${i + 1} of ${allJobsLength}`);
      const hiringRegime = getHiringRegimeBasedOnDescription({ description: job?.description });

      await JobOpportunityController.updateHiringRegime(job.uuid, hiringRegime);
    }
    console.log(`[update-hiring-regime] End`);
  } else if (functionToCall === 'update-description') {
    console.log(`[update-description] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      if (i % 50 === 0) console.log(`[update-description] Updating job ${i + 1} of ${allJobsLength}`);
      const description = job?.description?.replace(/\\n+/g, '\n')?.replace(/\*\*/g, "");

      await JobOpportunityController.updateDescription(job.uuid, description);
    }
    console.log(`[update-description] End`);
  }

}).catch(error => console.log(error))