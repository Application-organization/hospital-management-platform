const APIFeatures = require("../../../src/utils/apiFeatures");

describe("APIFeatures", () => {
  const createMockQuery = () => {
    const query = {
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
    };

    return query;
  };

  describe("filter()", () => {
    test("applies filter parameters and excludes query control fields", () => {
      const query = createMockQuery();

      const queryString = {
        isActive: true,
        role: "doctor",
        page: "2",
        sortBy: "name",
        order: "desc",
        limit: "10",
        search: "john",
      };

      const features = new APIFeatures(
        query,
        queryString
      ).filter();

      expect(query.find).toHaveBeenCalledWith({
        isActive: true,
        role: "doctor",
      });

      expect(features.filterQuery).toEqual({
        isActive: true,
        role: "doctor",
      });

      expect(features).toBeInstanceOf(APIFeatures);
    });

    test("returns the same APIFeatures instance for chaining", () => {
      const query = createMockQuery();

      const features = new APIFeatures(
        query,
        {}
      );

      expect(features.filter()).toBe(features);
    });
  });

  describe("search()", () => {
    test("creates case-insensitive OR search conditions", () => {
      const query = createMockQuery();

      const queryString = {
        search: "john",
      };

      const features = new APIFeatures(
        query,
        queryString
      ).search([
        "firstName",
        "lastName",
        "email",
      ]);

      expect(query.find).toHaveBeenCalledWith({
        $or: [
          {
            firstName: {
              $regex: "john",
              $options: "i",
            },
          },
          {
            lastName: {
              $regex: "john",
              $options: "i",
            },
          },
          {
            email: {
              $regex: "john",
              $options: "i",
            },
          },
        ],
      });
    });

    test("does not modify the query when search is not provided", () => {
      const query = createMockQuery();

      const features = new APIFeatures(
        query,
        {}
      ).search(["name"]);

      expect(query.find).not.toHaveBeenCalled();
      expect(features.filterQuery).toEqual({});
    });

    test("does not modify the query when no searchable fields are provided", () => {
      const query = createMockQuery();

      const features = new APIFeatures(
        query,
        {
          search: "john",
        }
      ).search([]);

      expect(query.find).not.toHaveBeenCalled();
      expect(features.filterQuery).toEqual({});
    });

    test("returns the same APIFeatures instance for chaining", () => {
      const query = createMockQuery();

      const features = new APIFeatures(
        query,
        {
          search: "john",
        }
      );

      expect(features.search(["name"])).toBe(features);
    });
  });

  describe("sort()", () => {
    test("sorts ascending when order is not desc", () => {
      const query = createMockQuery();

      new APIFeatures(
        query,
        {
          sortBy: "name",
          order: "asc",
        }
      ).sort();

      expect(query.sort).toHaveBeenCalledWith("name");
    });

    test("sorts descending when order is desc", () => {
      const query = createMockQuery();

      new APIFeatures(
        query,
        {
          sortBy: "createdAt",
          order: "desc",
        }
      ).sort();

      expect(query.sort).toHaveBeenCalledWith(
        "-createdAt"
      );
    });

    test("defaults to newest records first", () => {
      const query = createMockQuery();

      new APIFeatures(
        query,
        {}
      ).sort();

      expect(query.sort).toHaveBeenCalledWith(
        "-createdAt"
      );
    });

    test("returns the same APIFeatures instance for chaining", () => {
      const query = createMockQuery();

      const features = new APIFeatures(
        query,
        {}
      );

      expect(features.sort()).toBe(features);
    });
  });

  describe("paginate()", () => {
    test("calculates skip and limit correctly", () => {
      const query = createMockQuery();

      new APIFeatures(
        query,
        {
          page: "3",
          limit: "20",
        }
      ).paginate();

      expect(query.skip).toHaveBeenCalledWith(40);
      expect(query.limit).toHaveBeenCalledWith(20);
    });

    test("uses default page and limit values", () => {
      const query = createMockQuery();

      new APIFeatures(
        query,
        {}
      ).paginate();

      expect(query.skip).toHaveBeenCalledWith(0);
      expect(query.limit).toHaveBeenCalledWith(10);
    });

    test("returns the same APIFeatures instance for chaining", () => {
      const query = createMockQuery();

      const features = new APIFeatures(
        query,
        {
          page: "2",
          limit: "5",
        }
      );

      expect(features.paginate()).toBe(features);
    });
  });

  describe("method chaining", () => {
    test("supports filter, search, sort, and paginate chaining", () => {
      const query = createMockQuery();

      const features = new APIFeatures(
        query,
        {
          isActive: true,
          search: "john",
          sortBy: "name",
          order: "asc",
          page: "2",
          limit: "10",
        }
      )
        .filter()
        .search(["name", "email"])
        .sort()
        .paginate();

      expect(features).toBeInstanceOf(APIFeatures);

      expect(query.find).toHaveBeenCalledTimes(2);
      expect(query.sort).toHaveBeenCalledWith("name");
      expect(query.skip).toHaveBeenCalledWith(10);
      expect(query.limit).toHaveBeenCalledWith(10);
    });
  });
});