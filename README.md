# FSSN-socket

2022-03 풀스택서비스네트워킹 프로젝트

Node.js를 사용해서 Python의 Socket 예제를 재구현합니다.

## 실행 방법

실행 환경에 Node.js와 NPM이 설치되어있어야합니다.

```
npm install
node <실행하고자하는 파일명>
```

## 설명

아래와 같은 라이브러리를 이용해 코드를 작성했습니다.

- TCP socket - net, socket.io
- UDP socket - dgram

또한 기존 예제 코드는

- 1,2 (socket을 이용한 1:1 서버, 클라이언트)
- 3,4 (예외처리가 추가된 socket을 이용한 1:1 서버, 클라이언트)
- 5 (socketserver를 이용한 1:1 서버),
- 6, 7(socketserver를 이용한 1:N 서버, 클라이언트)
- 8 (socketserver를 이용한 N:M 채팅 서버)
- 9, 10 (UDP 1:N 서버, 클라이언트)
- 11 (UDP 채팅 서버)
  과 같이 진행되지만

Javascript의 특성상 소켓 연결이 기본적으로 이벤트 기반 (비동기적, 1:N 지원)으로 이루어지므로

1:1과 1:N의 구현 코드가 같게 되어 (즉 5번과 6번의 구현이 동일해짐)

- 1,2 (net을 이용한 1:N 서버, 클라이언트)
- 3,4 (예외처리가 추가된 net을 이용한 1:N 서버, 클라이언트)
- 5 (net을 이용한 N:M 채팅 서버)
- 6,7 (socket.io를 이용한 1:N 서버, 클라이언트)
- 8 (socket.io를 이용한 N:M 채팅 서버)
- 9, 10 (dgram을 이용한 UDP 1:N 서버, 클라이언트)
- 11 (dgram을 이용한 UDP 채팅 서버)

와 같이 구현을 진행했습니다.
