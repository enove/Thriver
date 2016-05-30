Meteor.methods({
    isAdmin: function () {
        // Return whether or not the logged-in user is an administrator
        return Meteor.user()? Meteor.user().admin : false;
    },
    
    /**
     * Determine last login for user.  Returns right now if not logged in.
     * @function
     * @returns {Date}
     */
    lastLogin: function () {
        if (Meteor.user() && Meteor.user().status && Meteor.user().status.lastLogin)
            return Meteor.user().status.lastLogin.date;
        
        return new Date();
    },
    
    //
    // Section-related methods
    //
    
    /**
     * Add new section
     * @method
     *   @param {string} template - Name of template to apply to section
     *   @param {number} index    - The index of the section relative to its siblings
     *   @param {string} parent   - The ID of a section's parent (optional)
     */
    addSection: function (template, index, parent) {
        // Check Authorization
        if (!Meteor.userId() || !Meteor.user().admin)
            throw new Meteor.Error('not-authorized');
        
        // Mutual Suspicion
        template = '' + template;
        index    = parseInt(index);
        
        // Add new section
        Sections.insert({
            name         : null,
            icon         : '\uf0e9',  // default icon: umbrella
            content      : null,
            template     : template,
            order        : index,
            displayOnPage: parent? false : true,
            tabs         : []
        },
        // Update parent section, if there is one, to include section
        function (error, id) {
            if (error) throw new Meteor.Error(error);
            
            // If no parent, do nothing
            if (!parent) 
                return;
            
            // Update parent element to include new child
            Sections.update({ '_id': parent }, {
                $addToSet: {
                    tabs: id
                }
            });
        });
    },
    
    /**
     * Update section order
     * @method
     *   @param {string} sectionId - ID of section to update
     *   @param {number} newIndex  - New index location of section
     */
    updateSectionOrder: function (sectionId, newIndex) {
        // Check Authorization
        if (!Meteor.userId() || !Meteor.user().admin)
            throw new Meteor.Error('not-authorized');
        
        // Mutual Suspicion
        sectionId = '' + sectionId;
        newIndex  = parseInt(newIndex);
        
        // Update order
        Sections.update({ '_id': sectionId }, {
            $set: { 'order': newIndex }
        });
    },
    
    // Delete a section
    deleteSection: function (id) {
        // Check Authorization
        if (!Meteor.userId() || !Meteor.user().admin)
            throw new Meteor.Error('not-authorized');
        
        var tabs, i, j;
        
        // Mutual Suspicion
        id = '' + id;
        
        // Delete any tabs
        tabs = Sections.findOne({ '_id': id }, { tabs: 1 });
        if (tabs && tabs.tabs instanceof Array) {
            tabs = tabs.tabs;
            
            // Remove each tab, one at a time
            for (i = 0, j = tabs.length; i < j; ++i) {
                Sections.remove({ '_id': tabs[i] });
            }
        }
        
        // Delete section
        Sections.remove({ '_id': id });
    },
    
    // Update a section's name and anchor
    updateSectionName: function (id, name) {
        // Check Authorization
        if (!Meteor.userId() || !Meteor.user().admin)
            throw new Meteor.Error('not-authorized');
        
        // Mutual Suspicion
        id = '' + id;
        name = '' + name;
        
        // Update section
        Sections.update({ '_id': id }, {
            $set: {
                name: name
            }
        });
    },
    
    // Update a section's content
    updateSectionContent: function (id, content) {
        // Check Authorization
        if (!Meteor.userId() || !Meteor.user().admin)
            throw new Meteor.Error('not-authorized');
        
        // Mutual Suspicion
        id = '' + id;
        content = '' + content;
        
        // Update section
        Sections.update({ '_id': id }, {
            $set: {
                content: content
            }
        });
    },
    
    /**
     * Remove an ID from list of children
     * @method
     *   @param {string} id    - ID of element to modify
     *   @param {string} child - ID of child to remove from list
     */
    removeChild: function (id, child) {
        // Check Authorization
        if (!Meteor.userId() || !Meteor.user().admin)
            throw new Meteor.Error('not-authorized');
        
        // Mutual Suspicion
        id = '' + id;
        child = '' + child;
        
        // Update list to remove child
        Sections.update({ '_id': id }, {
            $pull: {
                tabs: child
            }
        });
    },
    
    //
    // Tab-related methods
    //
    
    // Add a new tab
    addTab: function (id, order) {
        // Check Authorization
        if (!Meteor.userId() || !Meteor.user().admin)
            throw new Meteor.Error('not-authorized');
            
        // Mutual Suspicion
        id = '' + id;
        order = parseInt(order);
        
        // Add tab
        Sections.insert({
            name: null,
            icon: '\uf0e9',               // use default (umbrella)
            content: null,
            template: null,
            order: order,
            displayOnPage: false,
            tabs: []
        },
        // Update parent section to include the tab
        function (error, tabId) {
            if (error) throw new Meteor.Error(error);
            Sections.update({ '_id': id}, {
                $addToSet: {
                    tabs: tabId
                }
            });
        });
    },
    
    // Update tab order
    updateTabOrder: function (id, order) {
        // Check Authorization
        if (!Meteor.userId() || !Meteor.user().admin)
            throw new Meteor.Error('not-authorized');
        
        // Mutual Suspicion
        id = '' + id;
        order = parseInt(order);
        console.log('id ' + id);
        console.log('order ' + order);
        // Update order
        Sections.update({ '_id': id }, {
            $set: { 'order': order }
        });
    },
    
    // Update tab name
    updateTabName: function (id, name) {
        // Check Authorization
        if (!Meteor.userId() || !Meteor.user().admin)
            throw new Meteor.Error('not-authorized');
        
        // Mutual Suspicion
        id = '' + id;
        name = '' + name;
        
        // Update tab name
        Sections.update({ '_id': id }, {
            $set: { 'name': name }
        });
    },
    
    /**
     * Add new Action Alert
     * @method
     *   @param {string} title   - Action alert title
     *   @param {Date}   date    - Datetime object instance
     *   @param {string} content - Action alert content
     */
    addActionAlert: function (title, date, content) {
        // Check authorization
        if (!Meteor.userId() || !Meteor.user().admin)
            throw new Meteor.error('not-authorized');
        
        // Mutual suspicion
        title = '' + title;
        content = '' + content;
        if ( !(date instanceof Date) )
            date = new Date();
        
        // Generate URL for action alert
        var href = (function () {
            // Spaces become hyphens, no numbers or other characters,
            // lowercase, and only up to eight words
            return '/action-alert/' + title.toLowerCase().
                replace(/[^a-z\s]/g,'').trim().split(/\s/).join('-').
                replace(/^((?:.+?-){7}.+?)-.+/, '$1') + '/';
        })();
        
        // Add action alert to db
        Newsroom.insert({
            title  : title,
            url    : href,
            date   : date,
            type   : 'actionAlert',
            content: content
        });
    }
});