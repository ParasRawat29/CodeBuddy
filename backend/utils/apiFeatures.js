class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const parameter = this.queryStr.parameter;
  }
  filter() {}
  pagination() {}
}
