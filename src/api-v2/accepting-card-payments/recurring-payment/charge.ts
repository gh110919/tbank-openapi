import { mainAPI } from "UTILS/api";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  TerminalKey: string;
  PaymentId: string;
  RebillId: string;
  Token: string;
  IP: string;
  SendEmail: boolean;
  InfoEmail: string;
};

type TResponse = {
  TerminalKey: string;
  Amount: number;
  OrderId: string;
  Success: boolean;
  Status: string;
  PaymentId: string;
  ErrorCode: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
Метод проводит рекуррентный (повторный) платеж — безакцептное списание денежных средств со счета банковской карты клиента. Чтобы его использовать, клиент должен совершить хотя бы один платеж в пользу мерчанта, который должен быть указан как рекуррентный (параметр Recurrent методе Init), но фактически являющийся первичным.

После завершения оплаты в уведомлении на AUTHORIZED или CONFIRMED будет передан параметр RebillId.

В дальнейшем для проведения рекуррентного платежа мерчант должен вызвать метод Init, указать нужную сумму для списания в параметре Amount, а затем без переадресации на PaymentURL вызвать метод Charge для оплаты по тем же реквизитам и передать параметр RebillId, полученный при совершении первичного платежа.

Метод Charge работает по одностадийной и двухстадийной схеме оплаты. Чтобы перейти на двухстадийную схему, нужно переключить терминал в личном кабинете и написать на acq_help@tbank.ru с просьбой переключить схему рекуррентов.
 */
export const charge = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/Charge`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};
