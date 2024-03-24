import { Job } from "./job";

export type Apply = {
    id : number,
    job_id : number,
    user_id : number,
}

export type ShowApply = {
    id : number;
    job : Job;
    applicant : string;
    recruiter : string;
    date : string;
}