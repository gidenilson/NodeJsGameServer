package {
	import flash.display.Sprite;
	import flash.events.Event;
	import com.pnwrain.flashsocket.events.FlashSocketEvent;
	import com.pnwrain.flashsocket.FlashSocket;
	
	/**
	 * ...
	 * @author Gidenilson Alves Santiago
	 */
	public class Main extends Sprite {
		private var socket:FlashSocket;
		private var status:String;
		private var currentState:String;
		
		public function Main():void {
			if (stage)
				init();
			else
				addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void {
			removeEventListener(Event.ADDED_TO_STAGE, init);
			socket = new FlashSocket("ws://localhost:5000");
			socket.addEventListener(FlashSocketEvent.CONNECT, onConnect);
			socket.addEventListener(FlashSocketEvent.MESSAGE, onMessage);
			socket.addEventListener(FlashSocketEvent.IO_ERROR, onError);
			socket.addEventListener(FlashSocketEvent.SECURITY_ERROR, onError);
			
			socket.addEventListener("my other event", myCustomMessageHandler);
		
		}
		
		protected function myCustomMessageHandler(event:FlashSocketEvent):void {
			trace('we got a custom event!')
		}
		
		protected function onConnect(event:FlashSocketEvent):void {
			
			clearStatus();
		
		}
		
		protected function onError(event:FlashSocketEvent):void {
			
			status = "something went wrong";
		
		}
		
		protected function setStatus(msg:String):void {
			
			status = msg;
		
		}
		
		protected function clearStatus():void {
			
			status = "";
			currentState = "";
		
		}
		
		protected function onMessage(event:FlashSocketEvent):void {
			
			trace('we got message: ' + event.data);
			socket.send({msgdata: event.data}, "my other event");
		
		}
	
	}

}