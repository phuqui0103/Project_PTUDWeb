const { ObjectId } = require("mongodb");
class UserService {
  constructor(client) {
    this.User = client.db().collection("docgia");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  infoUser(payload) {
    const user = {
      ho: payload.ho,
      ten: payload.ten,
      diachi: payload.diachi,
      gioitinh: payload.gioitinh,
      ngaysinh: payload.ngaysinh,
      sodienthoai: payload.sodienthoai,
      password: payload.password,
      cart: payload.cart,
      ngaytao: payload.ngaytao,
      ngaychinhsua: payload.ngaychinhsua,
      deleted: 0,
    };
    // Remove undefined fields
    Object.keys(user).forEach((key) => {
      user["role"] = "user";
      user[key] === undefined && delete user[key];
    });
    return user;
  }
  async create(payload) {
    const user = this.infoUser(payload);
    const result = await this.User.findOneAndUpdate(
      user,
      {
        $set: {
          ngaytao:
            new Date().getDate() +
            "/" +
            (new Date().getMonth() + 1) +
            "/" +
            new Date().getFullYear(),
        },
      },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.User.find(filter);
    return await cursor.toArray();
  }

  async findByQuery(query) {
    const filter = {};
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        filter[key] = { $regex: new RegExp(query[key], "i") };
      }
    }
    return await this.find(filter);
  }

  async findById(id) {
    return await this.User.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async findUserLogin(filter) {
    const cursor = await this.User.findOne(filter);
    return await cursor;
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    console.log(filter);
    const update = this.infoUser(payload);
    const result = await this.User.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.User.findOneAndUpdate(
      {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      },
      { $set: { deleted: 1 } },
      { returnDocument: "after" }
    );
    return result;
  }

  async deleteAll() {
    const result = await this.User.deleteMany({});
    return result.deletedCount;
  }

  async addCart(id, cartItems) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = { $push: { cart: { $each: cartItems } } };
    const result = await this.User.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async updateCart(id, cartItems) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = { $push: { cart: { $each: cartItems } } };
    const result = await this.User.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteCart(id, cartItems) {
    const idCart = new ObjectId(cartItems);
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    console.log(idCart);

    const update = { $pull: { cart: { _id: idCart } } };
    console.log(update);
    const result = await this.User.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    return result;
  }

  async deleteAllCart(id) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const result = await this.User.findOneAndUpdate(
      filter,
      { $set: { cart: [] } },
      { returnDocument: "after" }
    );
    return result;
  }
}

module.exports = UserService;
