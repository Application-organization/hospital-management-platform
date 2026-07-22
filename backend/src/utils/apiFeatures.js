class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
        this.filterQuery = {};
    }

    filter() {
        const queryObj = { ...this.queryString };

        const excludedFields = [
            "page",
            "sortBy",
            "order",
            "limit",
            "search",
        ];

        excludedFields.forEach((field) => delete queryObj[field]);

        this.filterQuery = {
            ...this.filterQuery,
            ...queryObj,
        };

        this.query = this.query.find(queryObj);

        return this;
    }

    search(searchableFields = []) {
        if (
            this.queryString.search &&
            searchableFields.length > 0
        ) {
            const keyword = this.queryString.search;

            const searchCondition = {
                $or: searchableFields.map((field) => ({
                    [field]: {
                        $regex: keyword,
                        $options: "i",
                    },
                })),
            };

            this.filterQuery = {
                ...this.filterQuery,
                ...searchCondition,
            };

            this.query = this.query.find(searchCondition);
        }

        return this;
    }

    sort() {
        if (this.queryString.sortBy) {
            const order =
                this.queryString.order === "desc"
                    ? "-"
                    : "";

            this.query = this.query.sort(
                `${order}${this.queryString.sortBy}`
            );
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    paginate() {
        const page =
            Number(this.queryString.page) || 1;

        const limit =
            Number(this.queryString.limit) || 10;

        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;