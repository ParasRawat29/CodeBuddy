const { catchAsyncError } = require("../middlewares/catchAsyncError");

exports.paginate = async (model, search, page, limit) => {
  try {
    page = page < 1 ? 1 : page;
    limit = parseInt(limit, 10) || 1;
    page = parseInt(page, 10) || 10;
    let options = {
      offset: getOffset(page, limit),
      limit: limit,
    };

    if (Object.keys(search).length) {
      options = { ...options, ...search };
    }

    let { count, rows } = await model.findAndCountAll(options);

    return {
      currentPage: page,
      totalCount: count,
      limit: limit,
      data: rows,
    };
  } catch (err) {
    console.log(err);
  }
};

const getOffset = (page, limit) => {
  return page * limit - limit;
};
