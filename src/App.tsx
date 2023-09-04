import { useState, useEffect, useRef } from "react";
import { Button, Card, Row, Space, Col, Progress } from "antd";
import "./App.css";
import {
  UpOutlined,
  DownOutlined,
  SyncOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

function PomodoroApp() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [minutes, setMinutes] = useState(sessionLength);
  const [seconds, setSeconds] = useState(0);
  const [isSession, setIsSession] = useState(true);
  const [timerRunning, setTimerRunning] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (timerRunning) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          if (audioElementRef.current) {
            audioElementRef.current.play();
          }

          if (isSession) {
            setMinutes(breakLength);
            setIsSession(false);
          } else {
            setMinutes(sessionLength);
            setIsSession(true);
          }
        } else {
          if (seconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [minutes, seconds, timerRunning, breakLength, sessionLength, isSession]);

  const formatTime = (min: number, sec: number): string =>
    `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (isSession) {
        setMinutes(sessionLength - 1);
      }
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (isSession) {
        setMinutes(sessionLength + 1);
      }
    }
  };

  const handleStartStop = () => {
    setTimerRunning(!timerRunning);
  };

  const handleReset = () => {
    setTimerRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setMinutes(25);
    setSeconds(0);
    setIsSession(true);
    audioElementRef.current?.pause();
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = 0;
    }
  };

  return (
    <div>
      <Title style={{ fontWeight: "1000", color: "#003a8c" }}>
        25 + 5 Clock
      </Title>
      <Row justify="center" align="middle" gutter={16}>
        <Col flex="auto">
          <Card hoverable style={{ width: "100%" }}>
            <h2 id="session-label">Session Length</h2>
            <Row justify="space-between" gutter={[8, 8]} align="middle">
              <Button
                id="session-decrement"
                onClick={handleSessionDecrement}
                shape="circle"
                size="large"
                icon={<DownOutlined />}
              ></Button>
              <Title
                id="session-length"
                style={{ fontWeight: "100" }}
                editable={{
                  onChange: (value: string) => {
                    const parsedValue = parseInt(value, 10); // Parse the string value to an integer
                    if (
                      !isNaN(parsedValue) &&
                      parsedValue < 60 &&
                      parsedValue > 0
                    ) {
                      setSessionLength(parsedValue);
                      if (isSession) {
                        setMinutes(parsedValue);
                      }
                    }
                  },

                  onCancel: () => {
                    setSessionLength(25);
                    setMinutes(25);
                  },
                }}
              >
                {sessionLength}
              </Title>
              <Button
                id="session-increment"
                onClick={handleSessionIncrement}
                size="large"
                shape="circle"
                icon={<UpOutlined />}
              ></Button>
            </Row>
          </Card>
        </Col>
        <Col flex="auto">
          <Card hoverable style={{ width: "100%" }}>
            <h2 id="break-label">Break Length</h2>
            <Row justify="space-between" gutter={[8, 8]} align="middle">
              <Button
                shape="circle"
                size="large"
                id="break-decrement"
                icon={<DownOutlined />}
                onClick={handleBreakDecrement}
              ></Button>
              <Title
                id="break-length"
                style={{ fontWeight: "100" }}
                editable={{
                  onChange: (value: string) => {
                    const parsedValue = parseInt(value, 10); // Parse the string value to an integer
                    if (
                      !isNaN(parsedValue) &&
                      parsedValue < 60 &&
                      parsedValue > 0
                    ) {
                      setBreakLength(parsedValue);
                      if (!isSession) {
                        setMinutes(parsedValue);
                      }
                    }
                  },
                  autoSize: true,
                  onCancel: () => {
                    setBreakLength(5);
                    setMinutes(5);
                  },
                }}
              >
                {breakLength}
              </Title>

              <Button
                id="break-increment"
                onClick={handleBreakIncrement}
                size="large"
                shape="circle"
                icon={<UpOutlined />}
              ></Button>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row justify="center" align="middle" style={{ marginTop: "2rem" }}>
        <Card
          style={{
            textAlign: "center",
            background: "#364d79",
            width: "100%",
          }}
        >
          <Title
            level={1}
            id="timer-label"
            style={{ color: "white", margin: "0" }}
          >
            {isSession ? "SESSION" : "BREAK"}
          </Title>
          <Title
            level={1}
            id="time-left"
            style={{ color: "white", fontSize: "5vw", margin: "0" }}
          >
            {formatTime(minutes, seconds)}
          </Title>
        </Card>
        <Progress
          percent={
            isSession
              ? (1 - (minutes * 60 + seconds) / (sessionLength * 60)) * 100
              : (1 - (minutes * 60 + seconds) / (breakLength * 60)) * 100
          }
          type="line"
          showInfo
          format={(percent?: number) => {
            if (percent !== undefined) {
              return `${percent.toFixed(0)}%`;
            }
            // Handle the case where percent is undefined, if needed.
            return "N/A"; // or some other default value
          }}
        />
      </Row>
      <Row justify="center" style={{ paddingBottom: "2rem" }}>
        <Space size="middle" style={{ display: "flex" }}>
          {timerRunning ? (
            <Button
              id="start_stop"
              onClick={handleStartStop}
              icon={<PauseOutlined />}
              size="large"
            >
              Pause
            </Button>
          ) : (
            <Button
              id="start_stop"
              onClick={handleStartStop}
              icon={<PlayCircleOutlined />}
              type="primary"
              size="large"
            >
              Start
            </Button>
          )}

          <Button
            danger
            id="reset"
            onClick={handleReset}
            icon={<SyncOutlined />}
            size="large"
          >
            Reset
          </Button>
          <audio id="beep" ref={audioElementRef}>
            <source src="/beep.wav" type="audio/wav" />
          </audio>
        </Space>
      </Row>
    </div>
  );
}

export default PomodoroApp;
