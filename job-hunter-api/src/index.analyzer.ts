import { uniq } from "lodash";
import { getBenefitsBasedOnDescription, getRatingsBasedOnSkillsAndBenefits, getProgramathorNormalizedSkill, getSkillsBasedOnDescription } from "./analyzer/analyzer";
import JobOpportunityController from "./controllers/JobOpportunity.controller";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(async () => {
  const functionToCall = process?.argv?.[2];

  if (functionToCall === 'update-skills') {
    console.log(`[update-skills] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      console.log(`[update-skills] Updating job ${i + 1} of ${allJobsLength}`);
      const oldSkills = uniq(job?.skills?.split(',')?.map(cur => cur?.trim()));
      const newSkills = getSkillsBasedOnDescription({ skills: oldSkills, description: job?.description });

      await JobOpportunityController.updateSkills(job.uuid, newSkills?.join(','));
    }
    console.log(`[update-skills] End`);
  } else if (functionToCall === 'update-benefits') {
    console.log(`[update-benefits] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      console.log(`[update-benefits] Updating job ${i + 1} of ${allJobsLength}`);
      const oldBenefits = uniq(job?.benefits?.split(',')?.map(cur => cur?.trim()));
      const newBenefits = getBenefitsBasedOnDescription({ benefits: oldBenefits, description: job?.description });
      await JobOpportunityController.updateBenefits(job.uuid, newBenefits?.join(','));
    }
    console.log(`[update-benefits] End`);
  } else if (functionToCall === 'update-ratings') {
    console.log(`[update-ratings] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      console.log(`[update-ratings] Updating job ${i + 1} of ${allJobsLength}`);
      const skills = uniq(job?.skills?.split(',')?.map(cur => cur?.trim()));
      const benefits = uniq(job?.benefits?.split(',')?.map(cur => cur?.trim()));
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
      console.log(`[normalize-programathor-skills] Updating job ${i + 1} of ${allJobsLength}`);
      const skills = uniq(job?.skills?.split(',')?.map(cur => cur?.trim()));
      const newSkills = skills?.map(cur => getProgramathorNormalizedSkill(cur));
      await JobOpportunityController.updateSkills(job.uuid, newSkills?.join(','));
    }
    console.log(`[normalize-programathor-skills] End`);
  }

}).catch(error => console.log(error))