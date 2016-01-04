<?php
        $result = [];
        try {
            $result['size'] = 10;

        } catch (Exception $e){
            $result["errorCode"] = 1;
        }


      header('Content-type: application/json');


      echo json_encode($result);
