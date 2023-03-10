import StorageService from '@src/services/storage_service'
import StorageKey from '@src/enums/storage_key'
import User from '@src/interfaces/user'
import JitchatAPIService from '@src/services/jitchat_api_service'


export default class UserService {
  public static getExistingUser = async (): Promise<User | null> => {
    const storedUserID = StorageService.getKey(StorageKey.USER_ID)

    if (!storedUserID) {
      return null;
    }

    try {
      const user: User | null = await UserService.findUserDataFromServer(
        storedUserID
      )

      return user;
    } catch (error) {
      console.error(`Error getting user from Server! ${error}`)

      return null;
    }
  }

  public static findUserDataFromServer = async (userID: string): Promise<User | null> => {
    const response = await JitchatAPIService.getRequestWithParams(
      'retrieveuser',
      new URLSearchParams({
        id: userID,
      })
    )

    if (!response.ok) {
      return null;
    }

    const user: User = await response.json()

    return user
  }

  public static addUserToServer = async (user: User): Promise<User> => {
    const response = await JitchatAPIService.postRequestWithJson('newuser', user)

    const userInServer: User = await response.json();

    if (!userInServer.id) {
      throw new Error(`The user returned by the server was invalid: ${userInServer}`)
    }

    if (userInServer.id) {
      StorageService.setKey(StorageKey.USER_ID, userInServer.id)
    }

    return userInServer;
  }
}
