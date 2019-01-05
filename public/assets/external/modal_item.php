<?php

$currentLocation = "";

// ---------------------------------------------------------------------------------------------------------------------
// Here comes your script for loading from the database.
// ---------------------------------------------------------------------------------------------------------------------

// Remove this example in your live site and replace it with a connection to database //////////////////////////////////

ob_start();
include 'data.php';
ob_end_clean();

for( $i=0; $i < count($data); $i++){
    if( $data[$i]['id'] == $_POST['id'] ){
        $currentLocation = $data[$i]; // Loaded data must be stored in the "$currentLocation" variable
    }
}

// End of example //////////////////////////////////////////////////////////////////////////////////////////////////////

// Modal HTML code

$latitude = "";
$longitude = "";
$address = "";

if( !empty($currentLocation['latitude']) ){
    $latitude = $currentLocation['latitude'];
}

if( !empty($currentLocation['longitude']) ){
    $longitude = $currentLocation['longitude'];
}

if( !empty($currentLocation['address']) ){
    $address = $currentLocation['address'];
}

echo

'<div class="modal-item-detail modal-dialog" role="document" data-latitude="'. $latitude .'" data-longitude="'. $longitude .'" data-address="'. $address .'">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <div class="section-title">
                <h2>'. $currentLocation['title'] .'</h2>
                <div class="label label-default">'. $currentLocation['category'] .'</div>';

                // Ribbon ------------------------------------------------------------------------------------------

                if( !empty($currentLocation['ribbon']) ){
                    echo
                        '<figure class="ribbon">'. $currentLocation['ribbon'] .'</figure>';
                }

                // Rating ------------------------------------------------------------------------------------------

                

                echo
                '
                <!--end controls-more-->
            </div>
            <!--end section-title-->
        </div>
        <!--end modal-header-->
        <div class="modal-body">
            <div class="left">';

                // Gallery -----------------------------------------------------------------------------------------

                if( !empty($currentLocation['gallery']) ){
                    $gallery = "";
                    $carouselIndicators = '<ol class="carousel-indicators">';
                    for($i=0; $i < count($currentLocation['gallery']); $i++){
                        if($i == 0){
                            $gallery .= '<div class="item active"><img style="margin-left:20px;" src="'. $currentLocation['gallery'][$i] .'" alt=""></div>';
                            $carouselIndicators .= '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>';
                        }
                        else{
                            $gallery .= '<div class="item "><img style="margin-left:20px;" src="'. $currentLocation['gallery'][$i] .'" alt=""></div>';
                            $carouselIndicators .= '<li data-target="#carouselExampleIndicators" data-slide-to="'. $i .'" ></li>';
                        }
                    }
                    $carouselIndicators .= '</ol>';
                    echo
                    '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            '
                            . $carouselIndicators.' '.  $gallery .'
                        </div>
                    </div>
                    <!--end gallery-->';
                }

                echo
                '<div class="map" style="margin-left:20px;" id="map-modal"></div>
                <!--end map-->

                <section>';
                // Contact -----------------------------------------------------------------------------------------

                
                // Email -------------------------------------------------------------------------------------------

                if( !empty($currentLocation['email']) ){
                    echo
                        '<h5><i class="fa fa-envelope"></i>'. $currentLocation['email'] .'</h5>';
                }

                echo
                '</section>
                
            </div>
            <!--end left -->
            <div class="right">
                <section>
                    <h3 style="font-family:Poppins">Location of Project</h3>
                    <div ><p style="font-family:Karla; font-weight:700; margin-bottom:20px;  line-height:1; text-transform:none; color:rgb(17,68,168);">'. $currentLocation['location'] .'</p></div>
                    <h3 style="font-family:Poppins">About project</h3>
                    <div ><p style="font-family:Karla; font-weight:400; font-size:0.9em; line-height:1; text-transform:none; color:rgb(17,68,168);">'. $currentLocation['description'] .'</p><a href="'.$currentLocation['id'].'.html" style="margin-top:5%; font-weight:700;"> Read more </a></div>
                </section>
                <!--end about-->';

                // Tags ----------------------------------------------------------------------------------------------------------------

                if( !empty($currentLocation['tags']) ){
                    $tags = "";
                    for($i=0; $i < count($currentLocation['tags']); $i++){
                        $tags .= '<li>'. $currentLocation['tags'][$i] .'</li>';
                    }
                    echo
                        '<section>
                            <h3>Project tags</h3>
                            <ul class="tags">'.  $tags .'</ul>
                    </section>
                    <section>
                        <h3>Social Share</h3>
                        <div class="social-share"></div>
                    </section>
                    <!--end tags-->';
                }

                // Today Menu --------------------------------------------------------------------------------------

                if( !empty($currentLocation['today_menu']) ){
                    echo
                    '<section>
                        <h3>Today menu</h3>';
                    for($i=0; $i < count($currentLocation['today_menu']); $i++){
                        echo
                            '<ul class="list-unstyled list-descriptive icon">
                                <li>
                                    <i class="fa fa-cutlery"></i>
                                    <div class="description">
                                        <strong>'. $currentLocation['today_menu'][$i]['meal_type'] .'</strong>
                                        <p>'. $currentLocation['today_menu'][$i]['meal'] .'</p>
                                    </div>
                                </li>
                            </ul>
                            <!--end list-descriptive-->';
                    }
                    echo
                    '</section>
                    <!--end today-menu-->';
                }

                // Schedule ----------------------------------------------------------------------------------------

                if( !empty($currentLocation['schedule']) ){
                    echo
                    '<section>
                        <h3>Schedule</h3>';
                    for($i=0; $i < count($currentLocation['schedule']); $i++){
                        echo
                            '<ul class="list-unstyled list-schedule">
                                <li>
                                    <div class="left">
                                        <strong class="promoted">'. $currentLocation['schedule'][$i]['date'] .'</strong>
                                        <figure>'. $currentLocation['schedule'][$i]['time'] .'</figure>
                                    </div>
                                    <div class="right">
                                        <strong>'. $currentLocation['schedule'][$i]['location_title'] .'</strong>
                                        <figure>'. $currentLocation['schedule'][$i]['location_address'] .'</figure>
                                    </div>
                                </li>
                            </ul>
                            <!--end list-schedule-->';
                    }
                    echo
                    '</section>
                    <!--end schedule-->';
                }

                // Video -------------------------------------------------------------------------------------------

                if( !empty($currentLocation['video']) ){
                    echo
                    '<section>
                        <h3>Video presentation</h3>
                        <div class="video">'. $currentLocation['video'] .'</div>
                    </section>
                    <!--end video-->';
                }

                // Description list --------------------------------------------------------------------------------

                if( !empty($currentLocation['description_list']) ){
                    echo
                    '<section>
                        <h3>Listing Details</h3>';
                        for($i=0; $i < count($currentLocation['description_list']); $i++){
                            echo
                                '<dl>
                                    <dt>'. $currentLocation['description_list'][$i]['title'] .'</dt>
                                    <dd>'. $currentLocation['description_list'][$i]['value'] .'</dd>
                                </dl>
                                <!--end property-details-->';
                        }
                    echo
                    '</section>
                    <!--end description-list-->';
                }

                // Reviews -----------------------------------------------------------------------------------------

                
            echo
            '</div>
            <!--end right-->
        </div>
        <!--end modal-body-->
    </div>
    <!--end modal-content-->
</div>
<!--end modal-dialog-->
';