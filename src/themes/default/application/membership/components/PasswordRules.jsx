import React from 'react';

function PasswordRulesTemplate(props) {
    return (
        <div className="row">
            <div className="col col-sml-6">
                <h4 className="spc--bottom--sml">Tips for secure password</h4>
                <ul className="list--bulleted">
                    <li className="list--bulleted__item">should consist of at least 8 characters</li>
                    <li className="list--bulleted__item">should contain at least one lowercase letter (a-z), one uppercase letter (A-Z), one number (0-9) and one special character</li>
                    <li className="list--bulleted__item">longer and more complex passwords are most secure</li>
                    <li className="list--bulleted__item">select password you do not use to log in to other online accounts</li>
                    <li className="list--bulleted__item">do not share password with others</li>
                </ul>
            </div>
            <div className="col col-sml-6"> 
                <h4 className="spc--bottom--sml">Requirements for valid password</h4>
                <ul className="spc--bottom--med list--bulleted">
                    <li className="list--bulleted__item">must consist of at least 5, at most 40 characters</li>
                    <li className="list--bulleted__item">cannot contain spaces</li>
                    <li className="list--bulleted__item">cannot be similar to or contain other personal data (e.g. first name, last name, username, etc.)</li>
                    <li className="list--bulleted__item">must contain at least one special character: !#$()@?{}|*+,^.-&=%_:;~</li>
                </ul>
            </div>
        </div>
    )
}

export default PasswordRulesTemplate;
