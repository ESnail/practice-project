/*TODO:��Ŀ��ʽ����ʱ����ɾ���˴���Bootlint���*/
/*Bootlint: ���Bootstrapʹ���Ƿ���ȷ*/
(function () {
  var s = document.createElement("script");
  s.onload = function () {
    bootlint.showLintReportForCurrentDocument([]);
  };
  s.src = "js/bootlint.js";
  document.body.appendChild(s)
})();