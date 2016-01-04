<?php
      header('Content-type: application/json');
      sleep(2);
      echo json_encode(["dumb" => true, "now" => date('H:i:s', time()), "size" => 21]);
