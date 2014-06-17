package br.com.gidenilson.game.connector
{
	import flash.display.Sprite;
	import flash.events.Event;
	import com.pnwrain.flashsocket.events.FlashSocketEvent;
	import com.pnwrain.flashsocket.FlashSocket;
	import IWebSocketWrapper;
	
	/**
	 * ...
	 * @author Gidenilson Alves Santiago
	 */
	public class Main extends Sprite
	{
		
		//private var connector:Connector = new Connector("localhost", 8000);
		private var socket:FlashSocket;
		private var contador:int = 0;
		
		public function Main():void
		{
			if (stage)
				init();
			else
				addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			//connector.connect();
			socket = new FlashSocket("localhost:8000");
			socket.addEventListener(FlashSocketEvent.CONNECT, onConnect);
			socket.addEventListener(FlashSocketEvent.MESSAGE, onMessage);
			socket.addEventListener("player list", onPlayerList);
			//socket.addEventListener(FlashSocketEvent.IO_ERROR, onError);
			//socket.addEventListener(FlashSocketEvent.SECURITY_ERROR, onError);
		}
		
		private function onMessage(e:FlashSocketEvent):void
		{
			trace(e.data);
		}
		
		private function onPlayerList(e:FlashSocketEvent):void
		{
			trace(e.data);
		}
		
		private function onConnect(e:FlashSocketEvent):void
		{
			
			//socket.send({msgdata: "olá"},"my other event");
			socket.send({msgdata: "me dê os jogadores"}, "player list");
			//addEventListener(Event.ENTER_FRAME, bombardeio);
		}
		
		private function bombardeio(e:Event):void
		{
			socket.send({msgdata: contador++}, "contagem");
		}
	
	}

}