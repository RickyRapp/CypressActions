const passwordRequirements = [
  'required',
  'string',
  'min:8',
  'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'
];

const apiUrl = ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/";
const http = 'http://';
const charityPath = 'charity/';
const donorPath = 'donor/';
const bankAccountPath = 'bank-account/';
const documentPath = 'documents/';

const UnhandledErrorMessage = 'Something Went Wrong. Please Contact Support Or Try Again.';

const imageJpeg = 'image/jpeg';
const imageJpg = 'image/jpg';
const imagePng = 'image/png';
const imageGif = 'image/gif';
const applicationMSWord = 'application/msword';
const applicationMSExcel = 'application/vnd.ms-excel';
const applicationPDF = 'application/pdf';

export {
  passwordRequirements,
  apiUrl,
  http,
  donorPath,
  charityPath,
  bankAccountPath,
  documentPath,
  UnhandledErrorMessage,
  imageJpeg,
  imageJpg,
  imagePng,
  imageGif,
  applicationMSWord,
  applicationMSExcel,
  applicationPDF
};
