import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';

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
}
