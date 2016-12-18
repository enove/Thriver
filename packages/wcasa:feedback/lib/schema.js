/**
 * @summary Feedback namespace
 * @namespace
 */
Thriver.feedback = {};

/**
 * @summary Feedback collection
 * @type {Mongo.Collection}
 */
Thriver.feedback.collection = new Mongo.Collection('feedback');

/**
 * @summary Feedback schema
 * @type {SimpleSchema}
 */
Thriver.feedback.schema = new SimpleSchema({
  /** ID */
  _id: {
    type: String,
    optional: true, // ID is autogenerated
  },
  /** Element path */
  path: {
    type: String,
    optional: true,
  },
  /** Comments */
  comments: {
    type: String,
    optional: false,
  },
  /** User ID */
  userId: {
    type: String,
    optional: false,
  },
});

// Apply schema to collection
Thriver.feedback.collection.attachSchema(Thriver.feedback.schema);