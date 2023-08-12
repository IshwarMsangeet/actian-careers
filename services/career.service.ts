import fetch from 'node-fetch';
import { load } from 'cheerio';
import { Careers, CustomError, ICareerService } from '../interfaces';
import { Constants } from "../constants";

export class CareerService implements ICareerService {

    async getOpenPositions(department: string): Promise<Array<Careers>| CustomError> {

        const $ = await this.fetchHtmlFromActian();

        const departmentSections = $('.job-heading .department').filter((_: any, element: any) => {
            return $(element).text().trim().toLowerCase() === department.toLowerCase(); // Keeping department name Case insesative 
        }).parent();

        if (!departmentSections.length) {
            throw new CustomError(404, Constants.DEPARTMENT_NOT_FOUND);
        }
        const departmentSection = departmentSections.parent();

        const positions: Careers[] = [];

        departmentSection.each((_: any, section: any) => {
            const departmentName = $(section).find('.department').text().trim();
            const jobNames = $(section).find('.job-name').map((_: any, element: any) => $(element).text().trim()).get();
            positions.push({ department: departmentName, jobNames });
        });
        return positions; // return Department name with their list of job
    }

    private async fetchHtmlFromActian(): Promise<any> {
        const response = await fetch(Constants.URL);
        const html = await response.text();
        return load(html);
    }
}

