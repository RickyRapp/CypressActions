import { FormBase } from 'core/components';

export default class RegisterPublicForm extends FormBase {
  constructor(hooks) {
    super(hooks);
  }

  setup() {
    return {
      fields: [
        {
          name: 'fundName',
          label: 'Fund Name',
          placeholder: 'Enter Fund name',
          rules: 'required|string',
          value: 'The First Fund'
        },
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Enter Email',
          rules: 'required|email|string',
          value: 'jure.perak@hotmail.com'
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password',
          rules: ['required', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
          value: 'TheDonorsFund@1'
        },
        {
          name: 'confirmPassword',
          label: 'Confirm Password',
          placeholder: 'Confirm Password',
          rules: 'required|string|same:password',
          type: 'password',
          value: 'TheDonorsFund@1'
        },
        {
          name: 'firstName',
          label: 'First Name',
          placeholder: 'Enter First Name',
          rules: 'required|string',
          value: 'Jure'
        },
        {
          name: 'middleName',
          label: 'Middle Name',
          placeholder: 'Enter Middle Name',
          rules: 'required|string',
          value: 'First'
        },
        {
          name: 'lastName',
          label: 'Last Name',
          placeholder: 'Enter Last Name',
          rules: 'required|string',
          value: 'Perak'
        },
        {
          name: 'addressLine1',
          label: 'Address Line 1',
          placeholder: 'Enter Address Line 1',
          rules: 'required|string',
          value: 'Bihačka 1C'
        },
        {
          name: 'addressLine2',
          label: 'Address Line 2',
          placeholder: 'Enter Address Line 2',
          rules: 'required|string',
          value: 'test'
        },
        {
          name: 'city',
          label: 'City',
          placeholder: 'Enter City',
          rules: 'required|string',
          value: 'Osijek'
        },
        {
          name: 'state',
          label: 'State',
          placeholder: 'Enter State',
          rules: 'required|string',
          value: 'Hrvatska'
        },
        {
          name: 'zipCode',
          label: 'Zip Code',
          placeholder: 'Enter Zip Code',
          rules: 'required|string',
          value: '12345'
        },
        {
          name: 'number',
          label: 'Number',
          placeholder: 'Enter Number',
          rules: 'required|string',
          value: '123123'
        },
        {
          name: 'numberDescription',
          label: 'Number Description',
          placeholder: 'Enter Number Description',
          value: 'test'
        },
        {
          name: 'securityPin',
          label: 'Security Pin',
          placeholder: 'Enter Security Pin',
          rules: 'required|string|size:4',
          value: '0508'
        }
        // {
        //   name: 'botProtection',
        //   label: 'Bot Protection',
        //   rules: 'required|string'
        // }
      ]
    };
  }
}
