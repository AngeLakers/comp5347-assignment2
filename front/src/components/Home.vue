<template>
    <div>
        <div class="maxBox">
            <div class="mainBox">
                <div class="headerBox">
                    <div class="header w">
                        <div>OldPhoneDeals</div>
                        <div class="homeBtn">
                            <a>home</a>
<!--                          <a href="">home</a>-->
                        </div>

                        <el-input placeholder="Enter the content ..." v-model="searchValue" class="input-with-select">
                            <el-button @click="handleSearch" slot="append">search</el-button>
                        </el-input>

                        <div class="SignIn">
                          <a href="">Log in / Sign up</a>
<!--                            <router-link to="/Login">Log in / Sign up</router-link>-->
                        </div>

                        <div>
                            <i class="el-icon-shopping-cart-2"></i>
                            (0)
                        </div>
                    </div>
                </div>
                <div class="title">
                    Home
                </div>

                <!-- content -->
                <div class="contentBox">
                    <div class="contentMain w">
                        <div v-if="!flag">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>Sold out soon:</span>
                                </div>
                                <div class="itemBox" v-for="(item, index) in SoldList" :key="index"
                                    @click="handleClick(item)">
                                    <div class="img">
                                        <img src='../assets/logo.png' alt="">
                                    </div>
                                    <div class="name">
                                        name:{{ item.title }}
                                    </div>
                                    <div class="num">
                                        num:{{ item.stock }}
                                    </div>
                                    <div class="price">
                                        price:{{ item.price }}
                                    </div>
                                </div>
                            </el-card>

                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>Best sellers:</span>
                                </div>
                                <div class="itemBox" v-for="(item, index) in BestList" :key="index"
                                    @click="handleClick(item)">
                                    <div class="img">
<!--                                        <img src='../dataset_dev/phone_default_images/BlackBerry.jpeg' alt="">-->
                                    </div>
                                    <div class="name">
                                        name:{{ item.title }}
                                    </div>
                                    <div class="price">
                                        rating:{{ item.total.toFixed(2) }}
                                    </div>
                                </div>
                            </el-card>
                        </div>


                        <el-card class="box-card" v-if="flag">
                            <div class="itemBox" v-for="(item, index) in searchList" :key="index"
                                @click="handleClick(item)">
                                <div class="img">
<!--                                    <img src='../dataset_dev/phone_default_images/BlackBerry.jpeg' alt="">-->
                                </div>
                                <div class="name">
                                    name:{{ item.title }}
                                </div>
                                <div class="num">
                                    num:{{ item.stock }}
                                </div>
                                <div class="price">
                                    price:{{ item.price }}
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HtvHome',

    data() {
        return {
            SoldList: [], // 5 with the lowest inventory
            BestList: [], // 5 with the highest rating
            searchValue: '',
            searchList: [],
            list: [],
            flag: false
        };
    },

    mounted() {
        this.getList()
    },

    methods: {
        handleSearch() {
            // this.flag = true
            // var reg = new RegExp(this.searchValue, 'ig')
            // this.searchList = this.list.filter((p) => {
            //     // return p.title.indexOf(val) != -1
            //     return Object.keys(p).some(function (key) {
            //         return p.title.match(reg);
            //     })
            //     return this.list
            // })

            // if (this.searchValue == '') {
            //     this.getList()
            //     this.flag = false
            // }
            // console.log(this.searchList)
        },
        getList() {
            //     const _this = this
            //     this.getJsonObject('../dataset_dev/phonelisting.json',
            //         function (data) {
            //             _this.list = data
            //             data.sort((a, b) => {
            //                 return a.stock - b.stock
            //             })
            //             let res = data.filter(item => item.stock != 0)
            //             _this.SoldList = res.splice(0, 5)


            //             // 5 with the lowest inventory
            //             data.map(item => {
            //                 item.total = 0 // average
            //                 let value = 0 // total
            //                 let len = item.reviews.length
            //                 if (item.reviews.length != 0) {
            //                     for (let i = 0; i < len; i++) {
            //                         value += item.reviews[i].rating
            //                     }
            //                     item.total = value / len
            //                 }
            //             })

            //             data.sort((a, b) => {
            //                 return b.total - a.total
            //             })
            //             console.log(data.splice(0, 5))
            //             _this.BestList = data.splice(0, 5)
            //         },
            //         function (xhr) { console.error(xhr); }
            //     )
            // },
            // getJsonObject(path, success, error) {
            //     var xhr = new XMLHttpRequest();
            //     xhr.onreadystatechange = function () {
            //         if (xhr.readyState === XMLHttpRequest.DONE) {
            //             if (xhr.status === 200) {
            //                 if (success) success(JSON.parse(xhr.responseText));
            //             } else {
            //                 if (error) error(xhr);
            //             }
            //         }
            //     };
            //     xhr.open("GET", path, true);
            //     xhr.send();
            // },

            // handleClick(item) {
            //     sessionStorage.setItem('data', JSON.stringify(item))
            //     window.location.href = '../index/home.html'
        }
    }
}
</script>

<style scoped>
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

.maxBox {
    background-color: #f5f5f5;
}

.maxBox .mainBox .headerBox {
    height: 70px;
    display: flex;
}

.maxBox .mainBox .headerBox .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.maxBox .mainBox .headerBox .header .homeBtn {
    border: 1px solid #ccc;
    font-size: 14px;
    padding: 5px;
}

.maxBox .mainBox .headerBox .header .el-input-group {
    width: 50%;
}

.maxBox .mainBox .headerBox .header .SignIn {
    border: 1px solid #ccc;
    font-size: 14px;
    padding: 5px;
}

.maxBox .mainBox .title {
    height: 50px;
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.maxBox .mainBox .contentBox {
    margin-top: 10px;
}

.maxBox .mainBox .contentBox .contentMain .box-card {
    margin-bottom: 10px;
}

.maxBox .mainBox .contentBox .contentMain .el-card__body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.maxBox .mainBox .contentBox .contentMain .el-card__body .itemBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 18%;
    margin-bottom: 15px;
    padding: 0 10px;
}

.maxBox .mainBox .contentBox .contentMain .el-card__body .itemBox .img {
    width: 150px;
    height: 120px;
}</style>
