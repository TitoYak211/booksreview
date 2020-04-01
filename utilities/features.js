class BooksFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    };

    filter() {
        // Buid a filter query
        const queryObj = { ...this.queryString };
        const removedFields = ['page', 'sort', 'limit', 'fields'];
        removedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    };

    sort() {
        // Sorting books based on query object
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-year');
        };

        return this;
    };

    displayFields() {
        // Fields limiting
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        };

        return this;
    };

    paginate() {
        // PAGINATION: Default page is 1
        const page = this.queryString.page * 1 || 1;

        // Default number of books per page = 100
        const limit = this.queryString.limit * 1 || 100;

        // Number of books to skip for the requested page
        const skipValue = (page - 1) * limit;

        this.query = this.query.skip(skipValue).limit(limit);

        return this;
    };
};

module.exports = BooksFeatures;