// How many list items to load
Thriver.newsroom.quantity = new ReactiveVar(5);

// Regular Expression for Search field
Thriver.newsroom.search = new ReactiveVar();

/**
 * Handle searching
 * @method
 *   @param {Event} event
 */
const handleSearch = (event) => {
  const { value } = event.target;

  // If field is empty, clear reactive search variable
  if (value.length === 0) Thriver.newsroom.search.set();

  // Otherwise, create RegExp for searching fields
  else Thriver.newsroom.search.set(new RegExp(`.*${value}.*`, 'gi'));
};

// Subscriptions
Meteor.subscribe('inTheNews');
Meteor.subscribe('pressReleases');
Meteor.subscribe('actionAlerts');
Meteor.subscribe('newsletters');

// Events
Template.aside.events({
  /**
   * @summary Load More
   * @method
   *   @param {$.Event} event
   */
  'click #newsroom li.loadMore button': (event) => {
    check(event, $.Event);
    // No check on event.target because of old browser compatibility

    // Get all results
    Thriver.newsroom.quantity.set(0);

    // Hide "Load More Results" button for entire section
    const buttons = document.querySelectorAll('#newsroom li.loadMore button');
    for (let i = 0; i < buttons.length; i += 1) buttons[i].classList.add('hide');

    // Show "everything" text
    const texts = document.querySelectorAll('#newsroom .everything');
    for (let i = 0; i < texts.length; i += 1) texts[i].classList.remove('hide');
  },

  // Search field
  'keyup #searchNews, search #searchNews': handleSearch,

  /**
   * @summary Prevent form submission
   * @method
   *   @param {$.Event} event
   */
  'submit form#searchNewsForm': (event) => {
    check(event, $.Event);

    // Prevent form submission
    event.preventDefault();
  },

  /**
   * @summary Toggle Add Newsroom Item form
   * @method
   *   @param {$.Event} event
   */
  'click #newsroom aside.admin button.add': (event) => {
    check(event, $.Event);

    // Show form
    const form = document.querySelector('#newsForm');
    if (form.classList.contains('hide')) form.classList.remove('hide');
    else form.classList.add('hide');
  },
});

// Administrative events
Template.list.events({
  /**
   * @summary Delete a newsroom item
   * @method
   *   @param {$.Event} event
   */
  'click [data-tag="news"] aside.admin button.delete': (event) => {
    check(event, $.Event);

    event.stopPropagation();

    const { id } = event.target.parentElement.parentElement.dataset;
    if (window.confirm('Are you sure you want to delete this News Item?')) {
      Meteor.call('deleteNewsItem', id);
    }
  },
});
