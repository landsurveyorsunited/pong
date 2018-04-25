ply = $(".p:nth-child(1)")
ply_2 = $(".p:nth-child(2)")
ball = $(".b")
speed = 2.2
score = [0,0]
state = false
gameSound = 0.2

init = () => {
  size()
  gBall()
  placeP()
  $(".ply1s").prop("volume", gameSound)
  $(".ply2s").prop("volume", gameSound)
  $(".bounce").prop("volume", gameSound)
  $(".pattle").prop("volume", gameSound)
  announcer = true
  sound = true
  scoreLock = false
  resetScore = false
  cpb = false
}

placeP = () => {
  if (state == false) {
    ply.css("top", $(".s").offset().top + $(".s").height()/2 - ply.height()/2)
    ply_2.css("top", $(".s").offset().top + $(".s").height()/2 - ply_2.height()/2)
  }
}

size = () => {
  w = $(window)
  dO = w.offset
  dH = w.height()
  dW = w.width()
  $(".g").css({
    height: dH,
    width: dW
  })
  gPos()
}

gPos = () => {
  ply.css({
    left: dW - 100
  })
  ply_2.css({
    left: 100
  })
}

$(window).on("resize", () => {
  scoreLock = true
  size()
  placeP()
})

gBall = () => {
  ball.css({
    top: Math.floor(Math.random() * dH),
    left: Math.floor(Math.random() * dW)
  })
}

scores = () => {
  for (i=0;i<score.length;i++) {
    if (score[i] >= 99 || resetScore == true) {
      score = [0,0]
      $(".sb p:nth-child(1)").text(score[0])
      $(".sb p:nth-child(2)").text(score[1])
      resetScore = false
    }
  }
  if (scoreLock == false) {
    if (ball.offset().left >= dW) {
      score[0]++
      $(".sb p:nth-child(1)").text(score[0])
      if (announcer == true && sound == true) {$(".ply1s").get(0).play()}
    }
    if (ball.offset().left <= 0) {
      score[1]++
      $(".sb p:nth-child(2)").text(score[1])
      if (announcer == true && sound == true) {$(".ply2s").get(0).play()}
    }
  }
}

ani_ball = () => {
  setInterval(() => {
    
    var o = ball.offset()
    var p1 = ply.offset()
    var p2 = ply_2.offset()
    
    if (o.left <= 0) {
      hor = speed * -1
      if (sound == true) {$(".bounce").get(0).play()}
    } 
    if (o.left >= dW) {
      hor = speed
      if (sound == true) {$(".bounce").get(0).play()}
    }
    if (o.top <= 0) {
      vert = speed * -1
      if (sound == true) {$(".bounce").get(0).play()}
    } 
    if (o.top >= dH) {
      vert = speed
      if (sound == true) {$(".bounce").get(0).play()}
    }
    
    if (o.left + ball.width()/2 >= p1.left && o.left + ball.width()/2 <= p1.left + ply.width()) {
      if (o.top + ball.height()/2 >= p1.top && o.top + ball.height()/2  <= p1.top + ply.height()) {
        if (sound == true) {$(".pattle").get(0).play()}
        hor = speed
      }
    }
    if (o.left - ball.width()/2 >= p2.left && o.left - ball.width()/2 <= p2.left + ply_2.width()) {
      if (o.top - ball.height()/2 >= p2.top && o.top - ball.height()/2 <= p2.top + ply_2.height()) {
        if (sound == true) {$(".pattle").get(0).play()}
        hor = speed * -1
      }
    }
      
    ball.css({
      left: o.left - hor,
      top: o.top - vert
    })
    
    scores()
    
  }, 1)
}

$(".sw .so:nth-child(1)").mousemove((e) => {
  if (state == true) {
    ply_2.css({
      top: e.pageY - ply_2.height()/2
    })
    scoreLock = false
  }
})

$(".sw .so:nth-child(3)").mousemove((e) => {
  if (state == true) {
    ply.css({
      top: e.pageY - ply.height()/2
    })
    scoreLock = false
  }
})

$(".s").on("click", () => {
  ball.fadeIn(100)
  hor = speed
  vert = speed
  state = true
  $(".s").fadeOut(300)
  ani_ball()
})

$(".st:nth-child(1)").on("click", () => {
  if (announcer == true) {
    $(".st:nth-child(1)").css("opacity", "0.1")
    announcer = false
  } else {
    announcer = true
    $(".st:nth-child(1)").css("opacity", "1")
  }
})

$(".st:nth-child(2)").on("click", () => {
  if (sound == true) {
    $(".st:nth-child(2)").css("opacity", "0.1")
    sound = false
  } else {
    sound = true
    $(".st:nth-child(2)").css("opacity", "1")
  }
})

$(".st:nth-child(3)").on("click", () => {
  resetScore = true
})

$(".st:nth-child(4)").on("click", () => {
  if (cpb == false) {
    $(".b").addClass("cpb")
    $(".st:nth-child(4)").css("opacity", "0.1")
    cpb = true
  } else {
    $(".b").removeClass("cpb")
    $(".st:nth-child(4)").css("opacity", "1")
    cpb = false
  }
})

init()