var config = {}
config.aws = {}
config.aws.region = 'us-east-1'
config.aws.s3 = {}
config.aws.s3.bucket= 'talkclass-tcbucket3332'
config.aws.s3.bucketresized = 'talkclass-tcbucket3332-resized'
config.aws.apigateway = {}
config.aws.apigateway.endpoint = 'https://15psp95at5.execute-api.us-east-1.amazonaws.com'
config.aws.apigateway.stage = '/dev'
config.aws.apigateway.name = '/talkclass' 
config.roles = {}
config.roles.teacher = 'Teacher'
config.roles.parent = 'Parent'
module.exports= config

