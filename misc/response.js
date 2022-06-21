var Responses = {}

Responses.anErrorOccured = () => [400, {error: true, message: "An Error Occured"}]
Responses.invalidEmailOrPassword = () => [400, {error: true, message: "Invalid Email Or Password"}]
Responses.loginSuccess = (accessToken, refreshToken) => [200, {error: false, message: "Success", data: {accessToken, refreshToken}}]
Responses.successData = (data) => [200, {error: false, message: "Success", data}]
Responses.success = () => [200, {error: false, message: "Success"}]
Responses.requireLogin = () => [200, {error: true, message: "Please Login"}]

module.exports = Responses