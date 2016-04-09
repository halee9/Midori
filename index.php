<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" name="viewport">
    <title>TeriyakiOnline.com</title>
    <script src="common/jquery/jquery-1.5.min.js"></script>
    <script>
    $(document).ready(function() {
        var w = $(window).width();
        //w=500;
        if (w < 500) {
            location.replace("cell/");
        }
        else {
            location.replace("tab/");
        }
    });
    </script>
</head>

