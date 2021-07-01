class creEle {
  // 新增 constructor
  // constructor(tag = "div") => 可帶入 tag ，預設為 div
  // new實體時執行constructor() => create DOM元素
  constructor(tag = "div") {
    this.el = document.createElement(tag);
  }
  // create 文字
  setText(context = "") {
    const textNode = document.createTextNode(context);
    if (context === "") {
      this.el.innerText = "";
      return;
    }
    // 將文字加到預設的 tag
    this.el.append(textNode);
  }
    // 設定屬性
  setAttribute(attribute = {}) {
    // 必須為 object
    if (typeof attribute !== "object") return;
    for (let attr in attribute) {
      if (attr === "style") {
        this.el.style.cssText += attribute[attr];
      } else {
        this.el.setAttribute(attr, attribute[attr]);
      }
    }
  }
}

// 透過 class 創建實體
class SweetAlert {
    // constructor => new實體時會執行 constructor()
  constructor() {
    // 透過 js 產生 DOM
    // 利用封裝好的creEle()方法，產生 sw_bg div
    this.sw = new creEle("div");
    this.sw.setAttribute({ class: "sw_bg" });
    this.sw_mid = new creEle("div");
    this.sw_mid.setAttribute({ class: "sw_mid" });
    this.sw.el.appendChild(this.sw_mid.el);
    this.sw_content = new creEle("div" );
    this.sw_content.setAttribute({ class: "sw_content" });
    this.sw_mid.el.appendChild(this.sw_content.el);
    this.p = new creEle("p");
    this.btn = new creEle("button");
    this.btn.setText("ok");
    this.sw_content.el.appendChild(this.p.el);
    this.sw_content.el.appendChild(this.btn.el);

    // 將結構丟到 body
    document.querySelector("body").appendChild(this.sw.el);
  }

  // call open method
  open(text) {
    this.sw.el.classList.add("open");
    this.p.setText(text);

    // innerHTML 會把 div 裡的元素清空
    // innerHTML 會有XSS問題
    // document.getElementById("swAlert").innerHTML = html;
    // const sw = document.getElementsByClassName("sw_bg")[0];
    // sw.classList.add("open");

    // Prmise有兩個方法的回傳
    return new Promise((resolve, reject) => {
      this.btn.el.addEventListener("click", () => {
        this.close();
        // 完成時會執行 resolve()
        // resolve() => open.then( )
        resolve();
      });
    });
  }
  // 將close方法另外寫function
  close() {
    this.sw.el.classList.remove("open");
    this.p.setText("");
  }
}

export default SweetAlert;
