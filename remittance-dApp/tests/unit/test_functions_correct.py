from scripts.helpfulscripts import get_account
from brownie import RemittanceToken, TokenManagement, exceptions
import pytest


def test_can_set_node_as_admin_and_create_customer_correctly():
    # Arrange
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)
    rem_token = RemittanceToken.deploy({"from": account})
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )

    # Act
    token_management.setNodeAsAdmin(account, {"from": super_admin})
    token_management.createCustomer("Jon Doe", 50, {"from": account})

    # Assert
    token_management.getCustomer(1, {"from": account})["name"] == "Jon Doe"
    with pytest.raises(exceptions.VirtualMachineError):
        token_management.setNodeAsAdmin(node_account, {"from": account})
        # token_management.createCustomer("", 50, {"from": account})


def test_can_create_manager():
    # Arrange
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)
    rem_token = RemittanceToken.deploy({"from": account})
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )
    # Act
    token_management.createManager(
        "John Doe", 69, "Swat", account, {"from": super_admin}
    )
    # Assert
    assert (
        token_management.getManager(account, {"from": super_admin})["name"]
        == "John Doe"
    )
    with pytest.raises(exceptions.VirtualMachineError):
        token_management.createManager("John Doe", 69, "Swat", account)


def test_can_get_branch_customers():
    # Arrange
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)
    rem_token = RemittanceToken.deploy({"from": account})
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )
    # Act
    token_management.createManager(
        "John Doe", 69, "Swat", account, {"from": super_admin}
    )
    token_management.createManager(
        "Johnny Frank", 456, "Karachi", node_account, {"from": super_admin}
    )
    token_management.createCustomer("Jon Doe", 50, {"from": account})
    token_management.createCustomer("Jasper Doe", 75, {"from": node_account})
    token_management.createCustomer("Jane Doe", 100, {"from": account})
    token_management.createCustomer("Jasmine Doe", 125, {"from": node_account})
    print(token_management.getBranchCustomers({"from": account})[0])
    # Assert
    assert token_management.getBranchCustomers({"from": account})[1][0] == "Jane Doe"
    assert (token_management.getBranchCustomers({"from": account})[0][2]) == 50
    assert (
        token_management.getBranchCustomers({"from": node_account})[1][0]
        == "Jasmine Doe"
    )
    assert (token_management.getBranchCustomers({"from": node_account})[0][2]) == 75


def test_can_get_single_branch_customer():
    # Arrange
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)
    rem_token = RemittanceToken.deploy({"from": account})
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )
    # Act
    token_management.createManager(
        "John Doe", 69, "Swat", account, {"from": super_admin}
    )
    token_management.createManager(
        "Johnny Frank", 456, "Karachi", node_account, {"from": super_admin}
    )
    token_management.createCustomer("Jon Doe", 50, {"from": account})
    print(token_management.getSingleCustomer(1, {"from": account}))
    # Assert
    assert token_management.getSingleCustomer(1, {"from": account})[0] == "Jon Doe"
    with pytest.raises(exceptions.VirtualMachineError):
        token_management.getSingleCustomer(1, {"from": node_account})


def test_can_remove_node_as_admin_correctly():
    # Arrange
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)
    rem_token = RemittanceToken.deploy({"from": account})
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )

    # Act
    token_management.setNodeAsAdmin(account, {"from": super_admin})
    token_management.removeNodeAsAdmin(account)
    with pytest.raises(exceptions.VirtualMachineError):
        token_management.createCustomer("Jon Doe", 50, {"from": account})
        # token_management.setNodeAsAdmin(node_account, {"from": account})


def test_can_remove_customer_successfully():
    # Arrange
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)
    rem_token = RemittanceToken.deploy({"from": account})
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )
    token_management.setNodeAsAdmin(account, {"from": super_admin})
    token_management.createCustomer("Jon Doe", 50, {"from": account})
    token_management.createCustomer("Jane Doe", 50, {"from": account})

    # Act
    token_management.removeCustomer(1, {"from": account})

    # Assert
    assert token_management.getDeletedAccountNumbers({"from": account})[0] == 1
    with pytest.raises(exceptions.VirtualMachineError):
        token_management.removeCustomer(0, {"from": account})
        # token_management.removeCustomer(2, {"from": node_account})


def test_can_issue_transactions_successfully():
    # Arrange
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)
    rem_token = RemittanceToken.deploy({"from": account})
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )
    token_management.setNodeAsAdmin(account, {"from": super_admin})
    token_management.createCustomer("Jon Doe", 50, {"from": account})
    token_management.createCustomer("Jane Doe", 50, {"from": account})

    # Act
    token_management.issueTransaction(1, 2, 10, {"from": account})

    # Assert
    assert token_management.getCustomer(1, {"from": account})["balance"] == 40
    assert token_management.getCustomer(2, {"from": account})["balance"] == 60
    with pytest.raises(exceptions.VirtualMachineError):
        token_management.issueTransaction(1, 2, 0, {"from": account})
        # token_management.issueTransaction(1, 2, 10, {"from": node_account})


def test_can_convert_tokens_successfully():
    # Arrange
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)
    rem_token = RemittanceToken.deploy({"from": account})
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )
    token_management.setNodeAsAdmin(account, {"from": super_admin})
    rem_token.transfer(token_management.address, rem_token.totalSupply())

    # Act
    token_management.convertTokens(node_account, 10, {"from": account})

    # Assert
    assert rem_token.balanceOf(node_account) == 10 * 1664
    with pytest.raises(exceptions.VirtualMachineError):
        token_management.convertTokens(node_account, 10, {"from": node_account})


def test_can_set_transaction_parameters_successfully():
    # Arrange
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)
    rem_token = RemittanceToken.deploy({"from": account})
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )
    token_management.setNodeAsAdmin(account, {"from": super_admin})

    # Act
    token_management.createCustomer("Jon Doe", 50, {"from": account})
    token_management.createCustomer("Jane Doe", 50, {"from": account})
    tx = token_management.issueTransaction(1, 2, 10, {"from": account})
    token_management.setTransactionParameters(
        tx.txid, tx.timestamp, tx.gas_used, 1, 2, {"from": account}
    )

    # Assert
    assert (
        token_management.getRemitTransactionHistory(1, {"from": account})[0][5]
        == tx.txid
    )
    assert (
        token_management.getRemitTransactionHistory(1, {"from": account})[0][6]
        == tx.timestamp
    )
    assert (
        token_management.getRemitTransactionHistory(1, {"from": account})[0][7]
        == tx.gas_used
    )
    with pytest.raises(exceptions.VirtualMachineError):
        token_management.setTransactionParameters(
            tx.txid, tx.timestamp, tx.gas_used, 1, 2, {"from": node_account}
        )


def test_can_get_tx_history():
    # Arrange
    account = get_account()
    node_account = get_account(1)
    super_admin = get_account(2)
    rem_token = RemittanceToken.deploy({"from": account})
    token_management = TokenManagement.deploy(
        rem_token.address, rem_token.address, {"from": super_admin}
    )
    token_management.createManager(
        "John Doe", 69, "Swat", account, {"from": super_admin}
    )
    token_management.createManager(
        "Johnny Frank", 456, "Karachi", node_account, {"from": super_admin}
    )
    token_management.createCustomer("Jon Doe", 50, {"from": account})
    token_management.createCustomer("Jane Doe", 100, {"from": node_account})
    tx = token_management.issueTransaction(1, 2, 10, {"from": account})
    token_management.setTransactionParameters(
        tx.txid, tx.timestamp, tx.gas_used, 1, 2, {"from": account}
    )
    print(token_management.getBranchRemTxHistory(1, {"from": account}))
    print(token_management.getBranchRecTxHistory(2, {"from": node_account}))
    print(token_management.getBranchTx(1, tx.txid, {"from": account}))
    assert token_management.getBranchRemTxHistory(1, {"from": account})[0][4] == 10
    assert (
        token_management.getBranchRecTxHistory(2, {"from": node_account})[0][0]
        == "Jon Doe"
    )
    assert token_management.getBranchTx(1, tx.txid, {"from": account})[5] == tx.txid
    with pytest.raises(exceptions.VirtualMachineError):
        token_management.getBranchRemTxHistory(1, {"from": node_account})
