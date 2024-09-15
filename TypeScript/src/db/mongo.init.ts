import mongoose from "mongoose";

class MongoConnect {

    private instance: mongoose.Connection | null = null
    private async createConnect() {
        try {
            await mongoose.connect("mongodb://localhost:27017/todo");
            console.log("connect successfully!");
            return mongoose.connection;
        } catch (error: any) {
            console.log("failed to connect :::", error.message)
            throw new Error("failed to connect to mongo");
        }
    }

    async getInstance() {
        if (!this.instance || this.instance.readyState === 0) {
            this.instance = await this.createConnect()
            return this.instance
        }
        return this.instance
    }
}

export default new MongoConnect()