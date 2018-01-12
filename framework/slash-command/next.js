class Next {
  constructor(cmd, req, res) {
    this.cmd = cmd;
    this.req = req;
    this.res = res;
  }

  next(err) {
    if (err) {
      this.cmd.errHandler(err, this.req, this.res);
    }
  }
}