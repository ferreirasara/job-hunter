import { getProgramathorNormalizedSkill, analyzeDescription } from "./analyzer/analyzer";
import JobOpportunityController from "./controllers/JobOpportunity.controller";
import { AppDataSource } from "./data-source";
import { convertStrToArray, normalizeDescription } from "./utils/utils";
import { JobPlatform } from "./@types/types";

AppDataSource.initialize().then(async () => {
  const functionToCall = process?.argv?.[2];

  if (functionToCall === 'update-jobs') {
    console.log(`[update-jobs] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      if (i % 50 === 0) console.log(`[update-jobs] Updating job ${i + 1} of ${allJobsLength}`);
      const newDescription = normalizeDescription(job?.description);
      const analyzerResponse = analyzeDescription({ title: job?.title, description: newDescription });

      await JobOpportunityController.updateSkills(job.uuid, analyzerResponse?.skills?.join(','));
      await JobOpportunityController.updateBenefits(job.uuid, analyzerResponse?.benefits?.join(','));
      await JobOpportunityController.updateDescription(job.uuid, analyzerResponse?.description);
      await JobOpportunityController.updateHiringRegime(job.uuid, analyzerResponse?.hiringRegime);
      await JobOpportunityController.updateType(job.uuid, analyzerResponse?.type);
      await JobOpportunityController.updateSeniority(job.uuid, analyzerResponse?.seniority);
      if (analyzerResponse?.yearsOfExperience) await JobOpportunityController.updateYearsOfExperience(job.uuid, analyzerResponse?.yearsOfExperience);
      await JobOpportunityController.updateRatings(job.uuid, { skillsRating: analyzerResponse?.skillsRating, benefitsRating: analyzerResponse?.benefitsRating });
    }
    console.log(`[update-jobs] End`);
  } else if (functionToCall === 'normalize-programathor-skills') {
    console.log(`[normalize-programathor-skills] Start`);
    const allJobs = await JobOpportunityController.getAllJobsFromPlatform(JobPlatform.PROGRAMATHOR);
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      if (i % 50 === 0) console.log(`[normalize-programathor-skills] Updating job ${i + 1} of ${allJobsLength}`);
      const skills = convertStrToArray(job?.skills);
      const newSkills = skills?.map(cur => getProgramathorNormalizedSkill(cur));
      await JobOpportunityController.updateSkills(job.uuid, newSkills?.join(','));
    }
    console.log(`[normalize-programathor-skills] End`);
  } else if (functionToCall === 'normalize-description') {
    console.log(`[normalize-description] Start`);
    const allJobs = await JobOpportunityController.getAllJobs();
    const allJobsLength = allJobs?.length;
    for (let i = 0; i < allJobsLength; i++) {
      const job = allJobs[i];
      if (i % 50 === 0) console.log(`[normalize-description] Updating job ${i + 1} of ${allJobsLength}`);
      const newDescription = normalizeDescription(job?.description);
      await JobOpportunityController.updateDescription(job.uuid, newDescription);
    }
    console.log(`[normalize-description] End`);
  }

}).catch(error => console.log(error))