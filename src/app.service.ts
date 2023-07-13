import { Injectable } from '@nestjs/common';
import { Report, ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface ReportParam {
  amount: number;
  source: string;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return (
      data.report
        .filter((report) => report.type === type)
        .find((report) => report.id === id) || 'Not found'
    );
  }

  createReport(type: ReportType, { amount, source }: ReportParam) {
    const newReport: Report = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: ReportParam) {
    const reportToUpdate =
      data.report
        .filter((report) => report.type === type)
        .find((report) => report.id === id) || null;

    if (!reportToUpdate) return { message: 'not found' };

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return data.report[reportIndex];
  }
}
