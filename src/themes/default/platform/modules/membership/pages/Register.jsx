import React from 'react';
import { renderIf } from 'core/utils';
import { defaultTemplate } from 'core/utils';

function RegisterTemplate({ currentView: { onSubmit, error, loading } }) {
    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <label>Email</label>
                <RegisterFormInput type="email"
                    name="email"
                    placeholder="Email" />
                <label>Password</label>
                <RegisterFormInput type="password"
                    name="password"
                    placeholder="password" />
                <label>Repeat Password</label>
                <RegisterFormInput type="password"
                    name="password"
                    placeholder="password" />
                {
                    error && (
                        <div>
                            <p>{error}</p>
                        </div>
                    )
                }
                <p>
                    <button type="submit"> Register</button>
                    {loading && <span style={{ paddingLeft: 10 }}>Logging in...</span>}
                </p>
            </form>
        </div>
    )
}

function RegisterFormInput({
    error,
    type,
    onChange,
    ...rest
}) {
    return (
        <div>
            <input {...rest} type={type} />
            {renderIf(error)(<p>{error}</p>)}
        </div>
    )
}

export default defaultTemplate(RegisterTemplate);