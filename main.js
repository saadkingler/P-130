song = "";
sound = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
score_left_wrist = 0;
score_right_wrist = 0;

function preload()
{
    song = loadSound("music.mp3");
    sound = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    pose_net = ml5.poseNet(video,model_loaded);
    pose_net.on('pose',got_poses);
}

function model_loaded()
{
    console.log("Model loaded");
}

function draw()
{
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(score_left_wrist>0.2)
    {
        circle(left_wrist_x,left_wrist_y,20);
        number_left_wrist_y = Number(left_wrist_y);
        remove_dcimal = floor(number_left_wrist_y);
        volume = remove_dcimal/500;
        document.getElementById("volume").innerHTML = "volume - "+ volume;
        song.setVolume(volume);
    }

    if(score_right_wrist>0.2)
    {
        circle(right_wrist_x,right_wrist_y,20);

        if(right_wrist_y>0&&right_wrist_y<=100)
        {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }

        else if(right_wrist_y>100&&right_wrist_y<=200)
        {
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }

        else if(right_wrist_y>200&&right_wrist_y<=300)
        {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }

        else if(right_wrist_y>300&&right_wrist_y<=400)
        {
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }

        else if(right_wrist_y>400&&right_wrist_y<=500)
        {
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }

    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(score_right_wrist>0.2)
    {
        circle(left_wrist_x,left_wrist_y,20);
        number_left_wrist_y = Number(left_wrist_y);
        remove_dcimal = floor(number_left_wrist_y);
        volume = remove_dcimal/500;
        document.getElementById("volume").innerHTML = "volume - "+ volume;
        sound = setVolume(volume);
    }

    if(score_right_wrist>0.2)
    {
        circle(right_wrist_x,right_wrist_y,20);

        if(right_wrist_y>0&&right_wrist_y<=100)
        {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            sound.rate(0.5);
        }

        else if(right_wrist_y>100&&right_wrist_y<=200)
        {
            document.getElementById("speed").innerHTML = "speed = 1x";
            sound.rate(1);
        }

        else if(right_wrist_y>200&&right_wrist_y<=300)
        {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            sound.rate(1.5);
        }

        else if(right_wrist_y>300&&right_wrist_y<=400)
        {
            document.getElementById("speed").innerHTML = "speed = 2x";
            sound.rate(2);
        }

        else if(right_wrist_y>400&&right_wrist_y<=500)
        {
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            sound.rate(2.5);
        }
    }

}

function got_poses(results)
{
    if(results.length>0)
    {
        console.log(results);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;

    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}