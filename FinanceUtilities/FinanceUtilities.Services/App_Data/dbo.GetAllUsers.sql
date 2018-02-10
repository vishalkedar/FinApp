CREATE PROCEDURE [dbo].spGetAllUsers
AS
	SELECT userid,username,mobile,email,firstname,lastname,userType from [dbo].User WITH (NOLOCK)

RETURN 0

END
