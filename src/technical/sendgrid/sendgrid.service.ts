import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SendGrid from '@sendgrid/mail';
import { SendgridConfig } from 'config/config.interface';

@Injectable()
export class SendgridService {
  private sendgridConfig: SendgridConfig;

  constructor(private configService: ConfigService) {
    this.sendgridConfig = this.configService.get('services.sendgrid');
    SendGrid.setApiKey(this.sendgridConfig.apiKey);
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);

    console.log(`Email sent to ${mail.to}`);
    return transport;
  }

  async sendWelcomeMail(
    mail: Omit<SendGrid.MailDataRequired, 'from' | 'templateId'>,
  ) {
    const formattedMail: SendGrid.MailDataRequired = {
      ...mail,
      from: this.sendgridConfig.from,
      templateId: this.sendgridConfig.sendgridTemplateIds.welcome,
    };

    return this.send(formattedMail);
  }
}
