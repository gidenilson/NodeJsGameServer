package {
	import flash.display.Sprite;
	import flash.events.Event;
	import com.worlize.websocket.WebSocket;
	import com.worlize.websocket.WebSocketErrorEvent;
	import com.worlize.websocket.WebSocketEvent;
	import com.worlize.websocket.WebSocketMessage;
	
	
	/**
	 * ...
	 * @author Gidenilson Alves Santiago
	 */
	public class Main extends Sprite {
		private var websocket:WebSocket;
		
		public function Main():void {
			if (stage)
				init();
			else
				addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void {
			removeEventListener(Event.ADDED_TO_STAGE, init);
			websocket = new WebSocket("ws://127.0.0.1:5000", "*");
			websocket.addEventListener(WebSocketEvent.CLOSED, handleWebSocketClosed);
			websocket.addEventListener(WebSocketEvent.OPEN, handleWebSocketOpen);
			websocket.addEventListener(WebSocketEvent.MESSAGE, handleWebSocketMessage);
			websocket.addEventListener(WebSocketErrorEvent.CONNECTION_FAIL, handleConnectionFail);
			websocket.connect();
		}
		
		private function handleWebSocketOpen(event:WebSocketEvent):void {
			trace("Connected");
			websocket.sendUTF("Hello World!\n");
			
			//var binaryData:ByteArray = new ByteArray();
			//binaryData.writeUTF("Hello as Binary Message!");
			//websocket.sendBytes(binaryData);
		}
		
		private function handleWebSocketClosed(event:WebSocketEvent):void {
			trace("Disconnected");
		}
		
		private function handleConnectionFail(event:WebSocketErrorEvent):void {
			trace("Connection Failure: " + event.text);
		}
		
		private function handleWebSocketMessage(event:WebSocketEvent):void {
			if (event.message.type === WebSocketMessage.TYPE_UTF8) {
				trace("Got message: " + event.message.utf8Data);
			} else if (event.message.type === WebSocketMessage.TYPE_BINARY) {
				trace("Got binary message of length " + event.message.binaryData.length);
			}
		}
	
	}

}