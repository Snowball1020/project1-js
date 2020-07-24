const viewPath = 'pages';

//test before api -- this comments mean nothing
exports.home = (req, res) => {
  res.render(`${viewPath}/home`, {
    pageTitle: 'Home'
  });
};

exports.about = (req, res) => {
  res.render(`${viewPath}/about`, {
    pageTitle: 'About'
  });
};
