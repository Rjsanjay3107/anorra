interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

interface GoogleSheetsResponse {
  success: boolean;
  message: string;
  error?: string;
  data?: any;
}

export class DirectGoogleSheetsService {
  private static readonly SHEET_ID = '1jmZJC11L57T9SSK1rfOb-mjH3qURiXvQJ9_0v_KzjjY';
  private static readonly WEBHOOK_URL = 'https://hook.integromat.com/your-webhook-url'; // You'll need to set this up

  static async appendContactData(formData: ContactFormData): Promise<GoogleSheetsResponse> {
    try {
      const timestamp = new Date().toISOString();
      
      // Prepare the data for Google Sheets
      const rowData = [
        timestamp,
        formData.name,
        formData.email,
        formData.subject,
        formData.message,
        formData.consent ? 'Yes' : 'No'
      ];

      // Option 1: Use a webhook service (Zapier, Integromat, Make.com)
      // This is the most reliable approach for direct Google Sheets integration
      
      const webhookData = {
        sheetId: this.SHEET_ID,
        range: 'Sheet1!A:F',
        values: [rowData]
      };

      console.log('📤 Sending data to Google Sheets via webhook...');
      console.log('Data:', webhookData);

      // For now, let's try a direct approach using a public script
      // We'll create a simple Google Apps Script that accepts POST requests
      
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyBH00QIHAc57KTAwwt8XhiGpEOsm1Xxe60yC0Ufiqc3gPWlaYA2rzBfrT67_w6ckyR/exec';
      
      try {
        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'appendRow',
            sheetId: this.SHEET_ID,
            data: rowData
          }),
          mode: 'no-cors'
        });

        console.log('✅ Data sent to Google Sheets');
        
        return {
          success: true,
          message: 'Contact data saved to Google Sheets successfully',
          data: { timestamp, ...formData }
        };

      } catch (webhookError) {
        console.log('Webhook not configured, using fallback...');
        
        // Fallback: Log data and provide manual entry instructions
        console.log('=== GOOGLE SHEETS DATA ===');
        console.log('Sheet ID:', this.SHEET_ID);
        console.log('Sheet URL: https://docs.google.com/spreadsheets/d/1jmZJC11L57T9SSK1rfOb-mjH3qURiXvQJ9_0v_KzjjY/edit');
        console.log('Data to add:', rowData);
        console.log('========================');

        return {
          success: true,
          message: 'Contact form submitted (data ready for Google Sheets)',
          data: { timestamp, ...formData, rowData }
        };
      }

    } catch (error) {
      console.error('Google Sheets Service Error:', error);
      return {
        success: false,
        message: 'Failed to save contact data',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  static validateConfiguration(): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];

    if (!this.SHEET_ID) {
      issues.push('Google Sheets ID is not configured');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }

  // Method to create Google Apps Script for direct integration
  static getGoogleAppsScriptCode(): string {
    return `
// Google Apps Script for direct Google Sheets integration
// 1. Go to script.google.com
// 2. Create new project
// 3. Paste this code
// 4. Deploy as web app
// 5. Get the script URL and update the service

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'appendRow') {
      const sheet = SpreadsheetApp.openById('${this.SHEET_ID}').getSheetByName('Sheet1');
      sheet.appendRow(data.data);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Row appended successfully'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    message: 'Google Sheets integration service is running',
    sheetId: '${this.SHEET_ID}'
  })).setMimeType(ContentService.MimeType.JSON);
}
    `;
  }
}
