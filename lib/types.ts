export interface JobData {
    title: string;
    description: string;
    profession: string;
    industry: string;
    location: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    budgetType: string;
    budgetRate?: string;
    budgetRangeMin?: string;
    budgetRangeMax?: string;
    score: number;
}