class FeedDB {
  static inst: FeedDB;
  static getInst = () => {
    if (!FeedDB.inst) FeedDB.inst = new FeedDB();
    return FeedDB.inst;
  };

  id = 1;
  itemCount = 1;
  LDataDB = [{ id: 0, title: "test1", content: "Example body" }];

  selectItems = (count: number) => {
    if (count > this.itemCount)
      return { success: false, data: "Too many items queried" };
    if (count < 0) return { success: false, data: "Invalid count provided" };
    else return { success: true, data: this.LDataDB.slice(0, count) };
  };

  insertItem = (item: { title: string; content: string }) => {
    this.LDataDB.push({ id: this.id, ...item });
    this.id++;
    this.itemCount++;
    return true;
  };

  deleteItem = (id: number) => {
    let BItemDeleted = false;
    this.LDataDB = this.LDataDB.filter((value) => {
      const match = value.id === id;
      if (match) BItemDeleted = true;
      return !match;
    });
    if (BItemDeleted) this.itemCount--;
    return BItemDeleted;
  };

  updateItem = (id: number, item: { title: string; content: string }) => {
    let BItemUpdated = false;
    this.LDataDB = this.LDataDB.map((value) => {
      if (value.id === id) {
        BItemUpdated = true;
        return { id, ...item };
      } else return value;
    });
    return BItemUpdated;
  };
}

export default FeedDB.getInst();
