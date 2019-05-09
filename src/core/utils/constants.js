const passwordRequirements = [
  'required',
  'string',
  'min:8',
  'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'
];

const apiUrl = 'api.thedonorsfund.local/thedonorsfund/';
const http = 'http://';

const UnhandledErrorMessage = 'Something Went Wrong. Please Contact Support Or Try Again.';

export { passwordRequirements, apiUrl, http, UnhandledErrorMessage };
