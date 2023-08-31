from scripts.helpfulscripts import get_account
from brownie import RemittanceToken, TokenManagement


def deploy_and_create():
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)

    print("Deploying Remittance Token...")
    rem_token = RemittanceToken.deploy({"from": account})
    print(f"Remittance Token deployed at {rem_token.address}")

    print("Deploying Token Management...")
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )
    print(f"Remittance Token deployed at {token_management}")

    token_management.setNodeAsAdmin(account, {"from": super_admin})
    token_management.setNodeAsAdmin(
        "0x0063046686E46DC6F15918B61AE2B121458534A5", {"from": super_admin}
    )

    token_management.createCustomer("Powder Jinx", 100, {"from": account})
    token_management.createCustomer("Violet Vi", 10, {"from": account})
    token_management.createCustomer("Mercenary", 10000, {"from": account})
    token_management.createCustomer("Outlander", 69, {"from": account})
    token_management.createCustomer("Dark Priest", 416553, {"from": account})
    token_management.createCustomer("Knight", 52131, {"from": account})

    # print(token_management.getRoleMember(ADMIN_ROLE, 0))
    print(token_management.getCustomer(1))
    print(token_management.getCustomer(2))
    print(token_management.getCustomer(3))
    print(token_management.getCustomer(4))
    print(token_management.getCustomer(5))
    print(token_management.getCustomer(6))

    token_management.removeCustomer(1, {"from": account})
    token_management.removeCustomer(4, {"from": account})
    print(token_management.getDeletedAccountNumbers())

    token_management.createCustomer("Ron Weasely", 0, {"from": account})
    token_management.createCustomer("Eggplant", 554, {"from": account})
    token_management.createCustomer("Jerma", 56456, {"from": account})

    print(token_management.getCustomer(2))
    print(token_management.getCustomer(3))
    print(token_management.getCustomer(5))
    print(token_management.getCustomer(6))
    print(token_management.getCustomer(7))
    print(token_management.getCustomer(8))
    print(token_management.getCustomer(9))

    tx = token_management.issueTransaction(2, 3, 2, {"from": account})
    tx.wait(1)
    token_management.setTransactionParameters(
        tx.txid,
        tx.timestamp,
        tx.gas_used,
        2,
        3,
        {"from": account},
    )
    print(token_management.getRemitTransactionHistory(2, {"from": account}))
    print(token_management.getReceiveTransactionHistory(3, {"from": account}))

    trap = token_management.issueTransaction(2, 5, 2, {"from": account})
    trap.wait(1)
    tra = token_management.setTransactionParameters(
        trap.txid,
        trap.timestamp,
        trap.gas_used,
        2,
        5,
        {"from": account},
    )
    tra.wait(1)
    print(token_management.getRemitTransactionHistory(2, {"from": account}))
    print(token_management.getReceiveTransactionHistory(5, {"from": account}))

    trans = token_management.issueTransaction(2, 3, 2, {"from": account})
    trans.wait(1)
    train = token_management.setTransactionParameters(
        trans.txid,
        trans.timestamp,
        trans.gas_used,
        2,
        3,
        {"from": account},
    )
    train.wait(1)

    print(token_management.getRemitTransactionHistory(2, {"from": account}))
    print(token_management.getReceiveTransactionHistory(3, {"from": account}))

    trans = token_management.issueTransaction(3, 2, 2, {"from": account})
    trans.wait(1)
    train = token_management.setTransactionParameters(
        trans.txid,
        trans.timestamp,
        trans.gas_used,
        3,
        2,
        {"from": account},
    )
    train.wait(1)

    print(token_management.getRemitTransactionHistory(2, {"from": account}))
    print(token_management.getRemitTransactionHistory(3, {"from": account}))

    print(token_management.getReceiveTransactionHistory(2, {"from": account}))
    print(token_management.getReceiveTransactionHistory(3, {"from": account}))

    return rem_token, token_management


def main():
    deploy_and_create()
