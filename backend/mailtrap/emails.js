import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail= async (email, verificationToken) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully", response)

    } catch (error) {
        console.error("Error sending veification: ", error)
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "40b839fc-5cc8-464e-a6dd-ee2d924a7053",
            template_variables: {
                "company_info_name": "Auth Company",
                "name": name
            }
        })

        console.log("Welcome email sent  successfully")
    } catch (error) {
        console.error (`Error sending welcome email`, error)
        throw new Error(`Error sending welcome email ${error}`)
        
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        })
    } catch (error) {
        console.error(`Error sending password reset email`, error)
        throw new Error(`Error sending password reset email: ${error}`)
        
    }

}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password reset" 
        })
        console.log("Password reset email sent successfully", response)
    } catch (error) {
        console.log("Error in reset password ", error)
        res.status(400).json({success: false, message: error.message})
    }
}