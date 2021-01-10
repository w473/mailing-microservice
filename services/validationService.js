const { Validator, ValidationError } = require('express-json-validator-middleware');
const validator = new Validator({ allErrors: true });

const schemas = {
    definitions: {
        templateLocale: {
            type: 'object',
            required: ['locale', 'contents', 'subject'],
            properties: {
                locale: {
                    type: 'string',
                    pattern: "^[a-z][a-z]_[A-Z][A-Z]$"
                },
                subject: {
                    type: 'string'
                },
                contents: {
                    type: 'string'
                }
            }
        }
    },
    templateAdd: {
        type: 'object',
        required: ['name', 'locales'],
        additionalProperties: false,
        properties: {
            name: {
                type: 'string'
            },
            locales: {
                type: 'array',
                items: { "$ref": "#" }
            }
        }
    },
    templateEdit: {
        type: 'object',
        required: ['name'],
        additionalProperties: false,
        properties: {
            name: {
                type: 'string'
            }
        }
    },
    mail: {
        type: 'object',
        required: ['recepient', 'variables', 'locale', 'templateId'],
        additionalProperties: false,
        properties: {
            locale: {
                type: 'string',
                pattern: "^[a-z][a-z]_[A-Z][A-Z]$"
            },
            templateId: {
                type: 'integer'
            },
            recepient: {
                type: 'object',
                required: ['userId', 'email', 'name'],
                additionalProperties: false,
                properties: {
                    'userId': {
                        type: 'string',
                        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
                    },
                    'email': {
                        type: 'string',
                        format: 'email'
                    },
                    'name': {
                        type: 'string'
                    },
                }
            },
            variables: {
                type: 'object',
                additionalProperties: true
            }
        }
    }
};

exports.validate = (schemaName) => {
    return validator.validate({ body: schemas[schemaName] });
}
