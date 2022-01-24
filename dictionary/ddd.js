var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let doclick = async () => {
  for (let i = 0; i < 100; i++) {
    await sleep(5000);
    document.getElementById('sms_check_all').click();
    await sleep(1000);
    document.getElementById('del_msg_btn').click();
    await sleep(1000);
    document.getElementById('pop_confirm').click();
    await sleep(1000);
  }
};
doclick();
