<template>
    <div>
        <div class="maxBox">
            <div class="mainBox w">
                <div class="header">
                    <div class="headerBox w">
                        <div class="back">
                            <a href="../home/home.html">Back</a>
                        </div>
                        <div class="title">
                            ShopCart
                        </div>
                    </div>
                </div>

                <div class="item" v-for="(item, index) in list" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <el-button @click="handleDel(item, index)" style="float: right; padding: 3px 0" type="text">
                                <i class="el-icon-error"></i>
                            </el-button>
                        </div>
                        <div class="itemBox">
                            <div class="left">
<!--                                <img src='../dataset_dev/phone_default_images/Apple.jpeg' alt="">-->
                            </div>
                            <div class="right">
                                <div class="title">
                                    Title: {{ item.title }}
                                </div>
                                <div class="Price">
                                    Price: {{ item.price }}
                                </div>

                                <div class="num">
                                    Number:
                                    <el-input-number v-model="item.num" controls-position="right" size="mini" :min="1"
                                        @change="handleChange"></el-input-number>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>


                <div class="total">
                    Total price:{{ total }}
                </div>

                <div class="button w">
                    <el-button type="primary" @click="handleSubmit">Yes, trade!</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HtvShop',

    data() {
        return {
            list: [],
            total: 0 // total price
        };
    },

    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            // this.list = JSON.parse(sessionStorage.getItem('addList'))
            // this.total = 0
            // this.list.map(item => {
            //     this.total = this.total + item.num * item.price
            // })
        },
        handleDel(item, index) {
            // this.list.splice(index, 1)
            // sessionStorage.setItem('addList', JSON.stringify(this.list))
            // this.getList()
        },
        handleSubmit() {
            // sessionStorage.clear()
            // window.location.href = '../home/home.html'
        },
        handleChange() {
            // this.total = 0
            // this.list.map(item => {
            //     this.total = this.total + item.num * item.price
            // })
        }
    }
};
</script>

<style  scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}

.w {
    width: 1200px;
    margin: 0 auto;
}

img {
    width: 100%;
    height: 100%;
}

.maxBox .mainBox .header {
    margin-top: 50px;
}

.maxBox .mainBox .header .headerBox {
    display: flex;
    align-items: center;
}

.maxBox .mainBox .header .headerBox .back {
    width: 50px;
    padding: 5px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 5px;
}

.maxBox .mainBox .header .headerBox .title {
    margin-left: 200px;
    padding: 5px 0;
    width: 80%;
    border-bottom: 1px solid #ccc;
}

.maxBox .mainBox .item {
    margin-top: 20px;
    width: 80%;
    margin-left: 260px;
}

.maxBox .mainBox .item .itemBox {
    display: flex;
}

.maxBox .mainBox .item .itemBox .left {
    width: 300px;
    height: 150px;
}

.maxBox .mainBox .item .itemBox .right {
    width: calc(100% - 300px);
}

.maxBox .mainBox .item .itemBox .right .title {
    margin-bottom: 10px;
}

.maxBox .mainBox .item .itemBox .right .Price {
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
}

.maxBox .mainBox .item .itemBox .right .num {
    margin-top: 10px;
}

.maxBox .mainBox .total {
    float: right;
    margin-top: 20px;
}

.maxBox .mainBox .button {
    margin-top: 40px;
    width: 80%;
    display: flex;
    justify-content: center;
}
</style>
