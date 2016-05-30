/**
 * @summary Site sections namespace
 * @namespace Thriver.sections
 */
Thriver.sections = {};

/**
 * @summary Sections collection
 * @type {Mongo.Collection}
 */
Thriver.sections.collection = new Mongo.Collection('sections');

/**
 * @summary Sections collection schema
 * @type {SimpleSchema}
 */
Thriver.sections.schema = new SimpleSchema({
    /** ID */
    _id: {
        type: String,
        optional: true, // ID is autogenerated
    },
    /** Section name */
    name: {
        type: String,
        optional: true,
        label: 'Section name'
    },
    /** Section icon */
    icon: {
        type: String,
        optional: true,
        defaultValue: '',
        min: 1,
        max: 1,
        label: 'Section icon'
    },
    /** Section content, mostly just for info sections */
    content: {
        type: String,
        optional: true,
        label: 'Section text'
    },
    /** Section template, which is required */
    template: {
        type: String,
        label: 'Section template'
    },
    /** Order of section on page or within a section */
    order: {
        type: Number,
        label: 'Section order'
    },
    /** Display this section on the page? */
    displayOnPage: {
        type: Boolean,
        defaultValue: false,
    },
    /** Section Tabs or subsections */
    tabs: {
        type: [String],
        defaultValue: []
    }
});

// Apply schema to collection
Thriver.sections.collection.attachSchema(Thriver.sections.schema);
