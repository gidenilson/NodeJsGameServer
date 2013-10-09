package br.com.gidenilson.game.connector {
	import flash.display.Sprite;
	import flash.events.Event;
	
	
	/**
	 * ...
	 * @author Gidenilson Alves Santiago
	 */
	public class Teste extends Sprite {
		
		private var connector:Connector
		
		private var contador:int = 0;
		
		public function Teste():void {
			if (stage)
				init();
			else
				addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void {
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			connector = new Connector("127.0.0.1", 5000);
			connector.connect();
			connector.addEventListener(ConnectorEvent.CONNECTED, _onConnected);
			connector.addEventListener(ConnectorEvent.RECEIVE, _onData);
		
		}
		private function _onConnected(e:ConnectorEvent):void {
		connector.send('{"msg":" a mensagem agora ficou bem maior!"}');
		}
		private function _onData(e:ConnectorEvent):void {
			trace(e.data);
		}
	}

}